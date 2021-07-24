import { updateResultText } from './view'

export const removeZoomTabs = async () => {
  const condition = new RegExp(/((https|http):\/\/.*zoom\.us\/.*#success|(https|http):\/\/.*zoom\.us\/postattendee.*)/);
  const tabs = await chrome.tabs.query({
    url: [
      '*://zoom.us/*',
      '*://*.zoom.us/*',
    ],
  });
  const queriedTabs = tabs.filter(tab => {
    return condition.test(tab.url);
  });
  queriedTabs.forEach(tab => {
    chrome.tabs.remove(tab.id);
  });

  updateResultText(queriedTabs.length);
}
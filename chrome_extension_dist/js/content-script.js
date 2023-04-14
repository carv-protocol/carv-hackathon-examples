// document.body.innerHTML = `
// <div id="root"></div>
// `;
const auth_channel = new BroadcastChannel('auth');

addCustomEventListener();

addChromeListener();

function addCustomEventListener() {
  document.addEventListener('requestTokenLogin', event => {
    chrome.runtime.sendMessage(
      {
        type: 'requestTokenLogin',
        data: event.detail,
      },
      res => {
        auth_channel.postMessage({
          type: 'tokenLoginResponse',
          response: res,
        });
      }
    );
  });

  document.addEventListener('requestOpenLink', event => {
    const type = event.detail;

    if (type === 'twitter') {
      chrome.runtime.sendMessage(
        {
          type: 'requestOpenLink',
          data: {
            type,
          },
        },
        res => {
          if (res.code === 0) {
            window.open(
              res.data,
              'intent',
              `resizable=yes,toolbar=no,location=yes,width=600,height=760,left=50,top=50`
            );
          } else {
            auth_channel.postMessage({
              type: 'openLinkResponse',
              response: res,
            });
          }
        }
      );
    }
  });

  document.addEventListener('requestWalletLogin', event => {
    chrome.runtime.sendMessage(
      {
        type: 'requestWalletLogin',
        data: event.detail,
      },
      res => {
        auth_channel.postMessage({
          type: 'walletLoginResponse',
          response: res,
        });
      }
    );
  });
  document.addEventListener('requestCreateNewAccount', event => {
    chrome.runtime.sendMessage(
      {
        type: 'requestCreateNewAccount',
        data: event.detail,
      },
      res => {
        auth_channel.postMessage({
          type: 'createNewAccountResponse',
          response: res,
        });
      }
    );
  });
}

function addChromeListener() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    auth_channel.postMessage({
      type: 'tokenLoginResponse',
      response: request,
    });
  });
}

const auth_channel = new BroadcastChannel('auth');

const inject_site_urls = ['www.baidu.com'];

setTimeout(() => {
  if (inject_site_urls.includes(location.host)) {
    document.body.innerHTML = `
    <div id="root"></div>
    `;
    injectCustomJs();
  }
}, 1000);

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

// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'logic/index.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/logic/index.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}

start();

function start() {
  // document.body.innerHTML = `
  // <div id="root"></div>
  // `;
  const auth_channel = new BroadcastChannel('auth');

  document.addEventListener('carvOauthResponse', event => {
    chrome.runtime.sendMessage(
      {
        type: 'requestCarvLogin',
        data: event.detail,
      },
      res => {
        auth_channel.postMessage({
          type: 'carvLoginResponse',
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
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                var input = document.createElement('input');
                input.value = data.shortLink;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                window.alert('Copied')
                return;
            } else {
                window.alert('Error');
                return;
            }
        }
    }
    var url = '<Enter Your Domain>';
    var firebaseApiKey = '<Enter Your WEB API key>';
    var content = '{"dynamicLinkInfo":{"domainUriPrefix":"' + url + '","link":"' + tab.url + '"},"suffix":{"option":"SHORT"}}';
    req.open('POST', 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + firebaseApiKey, true);
    req.setRequestHeader('content-type', 'application/json');
    req.send(content);
});

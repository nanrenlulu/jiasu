window.site_code = '3_3';
window.feedback = false;
window.bdIds = ['2c2eaee7858675aced3fad3d524be9bb','c4994262310cf443b674a94adc2b0319','08132f02c9c03d7ec98d523f8e23a7da']
window.bdIds.forEach((item) => {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?" + item;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
});
window.googleIds = ['UA-207595667-1']
window.googleIds.forEach((item) => {
    document.write(
        '<script async src="https://www.googletagmanager.com/gtag/js?id=' +
            item +
            '"></script>'
    );
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", item);
});


(function () {
	//编码
	var appId='mm1';
	var baseUrl='https://maskanalyse.com/data-statistics-node/';
	var jsUrl='https://img.maskanalyse.com/data-statistics-server/js/http.data.js';
	function init() {
		var session =  window.createAnalyseSession(appId,baseUrl);
		session.listener();
	}
	if(window.createAnalyseSession){
		init();
	}else{
		var script = window.document.createElement('script');
		script.src=jsUrl;
		window.document.head.appendChild(script);
		script.onload=init;
	}

})();

setTimeout(() => {
  let meta = document.createElement('meta');
  meta.content='no-referrer';
  meta.name='referrer';
  document.getElementsByTagName('head')[0].appendChild(meta);
}, 600);


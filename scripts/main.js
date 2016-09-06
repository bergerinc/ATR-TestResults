(function(win, $){
    var obj = {};

    $().ready(function(){

        //set event handler for side nav toggle
        $('div.brand-container i.fa-bars').on('click', function(){
            toggleSideNav();
        });

        //set charts
        setChart1();
        setChart2();
    });

    var toggleSideNav = function(){
        var side = $('div.sidenav');
        var main = $('div.main-content');
        var sideWidth = side.width();

        if(sideWidth === 50){
            side.width('280px');
            main.css('left', '280px');
        }else{
            side.width('50px');
            main.css('left', '50px');
        }
    };

    var setChart1 = function(){
        var data = getChartData1();
        var cnvFT = document.getElementById('cnv-failed-tests');
        var chartFailedTests = new Chart(cnvFT, {
            type: 'doughnut',
            data: data
        });

    };

    var setChart2 = function(){
        var data = getChartData2();
        var cnvPP = document.getElementById('cnv-pass-percent');
        var chartPassedPercent = new Chart(cnvPP, {
            type: 'doughnut',
            data: data
        });
    };

    var getChartData1 = function(){
        var data = {
            labels: [],
            datasets: [
            {
                data: [12,0],
                backgroundColor: [
                    "#ff0000",
                    "#00a000"
                ]
            }]
        };
        return data;
    };

    var getChartData2 = function(){     
        var data = {
            labels: [],
            datasets: [
            {
                data: [37,63],
                backgroundColor: [
                    "#ff0000",
                    "#00a000"
                ]
            }]
        };
        return data;
    };

})(window, jQuery);
$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage'],
        sectionsColor: ['#FFFFFF', '#E6E6E6', '#CFCFCF', '#BABABA', '#A7A7A7'],
        navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 900
    });
});
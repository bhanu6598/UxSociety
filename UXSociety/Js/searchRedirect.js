/**
 * Created by bhanu6598 on 8/14/15.
 */
(function(){
    document.getElementById('my_button').onclick = function() {
        document.getElementById('searchBar').scrollIntoView();
        document.getElementById('searchBar').focus();
    };
})();
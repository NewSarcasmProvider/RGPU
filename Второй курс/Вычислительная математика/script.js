function selectData(){

    function gid(i) {return document.getElementById(i);}

    function init() {
    var list = {
        first: ['Не выбрано', 'Автомобили', 'Компьютеры', 'Знакомство'],
        second: {
        1: ['Не выбрано', 'BMW X5', 'Jaguar F5', 'Lamborgini Italian'],
        2: ['Не выбрано', 'Windows', 'Mac', 'Linux'],
        3: ['Не выбрано', 'Love', 'Meeting', 'Sex']
        }
    }

    var sid = 'first', first = gid(sid), cnt = list[sid].length, i=0;
    first.options.length = 0;
    for (i=0; i<cnt; i++) {first.options[i] = new Option(list[sid][i], i);}

    first.onchange = function() {
        sid = 'second';
        var second = gid(sid), cnt = list[sid][this.value].length;
        second.options.length = 0;
        for (i=0; i<cnt; i++) {
            second.options[i] = new Option(list[sid][this.value][i], i);
            }
        second.style.display = 'inline-block';
        second.onchange();
        }
    }

    document.body.onload = init;

}
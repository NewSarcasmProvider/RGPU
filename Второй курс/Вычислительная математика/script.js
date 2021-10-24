function select() {

    function gid(i) {return document.getElementById(i)}
        
    function init() {
        let list = {
            first: ['Не выбрано', 'Алгоритм с постоянным шагом', 'Алгоритм с переменным шагом'],

            second: {
                1: ['Не выбрано', 'Метод прямоугольников левых частей', 'Метод прямоугольников правых частей', 'Метод трапеций', 'Метод парабол'],
                2: ['Не выбрано', 'Метод двойного пересчета 1', 'Метод двойного пересчета 2']
            }
        }
    
        let sid = 'first', first = gid(sid), cnt = list[sid].length, i=0
        first.options.length = 0
        for (i=0; i<cnt; i++) {first.options[i] = new Option(list[sid][i], i)}
    
        first.onchange = function() {
            sid = 'second'
            let second = gid(sid), cnt = list[sid][this.value].length
            second.options.length = 0

            for (i=0; i<cnt; i++) {
                second.options[i] = new Option(list[sid][this.value][i], i)
            }

            second.style.display = 'inline-block'
        }
    }
    
    document.body.onload = init;

}

function prog() {

    let selectElem1 = document.getElementById('first')
    let selectElem2 = document.getElementById('second')

    let resultElem = document.getElementById('result')

    let index = selectElem2.options[selectElem2.selectedIndex].text
    let index2 = selectElem1.options[selectElem1.selectedIndex].text
    let br = document.createElement('br');

    n = 1000

    a = 1
    b = 4
    h = (b - a) / n
    s = 0

    E = 0.00001

    r = Math.abs(((b - a) ** 2 / (2 * n)) * 3.389056)
    
    resultElem.innerHTML = "Остаточный член R: " + r.toFixed(4) + "<br>"

    if (index2 === 'Алгоритм с постоянным шагом') {

        if (index === 'Метод прямоугольников левых частей') {
            
            resultElem.innerHTML += 'Метод прямоугольников левых частей: ' + "<br>"
            
            for (n = 10; n < 100000; n += '0') {

                h = (b - a) / n
                s = 0

                x = a
                
                while (x <= b - h){
                    s = s + f(x)
                    x = x + h
                }
                
                i = h * s

                resultElem.innerHTML += 'при n = ' + n + ' результат = ' + i.toFixed(4) + "<br>"
            }   
            

        } else

        if (index === 'Метод прямоугольников правых частей') {

            resultElem.innerHTML += 'Метод прямоугольников правых частей: ' + "<br>"

            for (n = 10; n < 100000; n += '0') {

                h = (b - a) / n
                s = 0

                x = a + h

                while (x <= b){
                    s = s + f(x)
                    x = x + h 
                }

                i = h * s

                resultElem.innerHTML += 'при n = ' + n + ' результат = ' + i.toFixed(4) + "<br>"
            }

        } else

        if (index === 'Метод трапеций') {

            resultElem.innerHTML += 'Метод трапеций: ' + "<br>"

            for (n = 10; n < 100000; n += '0') {

                h = (b - a) / n
                s = 0

                x = a + h
                
                while (x <= (b - h)) {
                    s = s + x * x
                    x = x + h
                }

                i = h * ((f(a) + f(b)) / 2 + s)

                resultElem.innerHTML += 'при n = ' + n + ' результат = ' + i.toFixed(4) + "<br>"
            }

        } else

        if (index === 'Метод парабол') {

            resultElem.innerHTML += 'Метод парабол: ' + "<br>"

            for (n = 10; n < 100000; n += '0') {

                h = (b - a) / n

                x = a + h
                s1 = 0
                s2 = 0

                while (x <= (b - h)){
                    s1 = s1 + x*x
                    x = x + 2 * h
                }

                x = a + 2 * h

                while (x <= (b - 2 * h)){
                    s2 = s2 + x*x
                    x = x + 2 * h
                }

                i = h / 3 * (f(a) + f(b) + 4 * s1 + 2 * s2)


                resultElem.innerHTML += 'при n = ' + n + ' результат = ' + i.toFixed(4) + "<br>"
            }

        } else 

        resultElem.innerHTML = 'Выберите метод'

    } else

    if (index2 === 'Алгоритм с переменным шагом') {

        if (index === 'Метод двойного пересчета 1') {

            resultElem.innerHTML += 'Метод двойного пересчета 1: ' + "<br>"

            h = E ** (1 / 2)
            inn = 0
            inn2 = 0

            while (Math.abs(inn - inn2) <= E) {

                inn = 0
                inn2 = 0
                i = a + h

                while (i <= b) {
                    inn += (f(i) + f(i - h)) / 2
                    i += h
                }

                inn *= h
                h /= 2
                i = a + h

                while (i <= b) {
                    inn2 += (f(i) + f(i - h)) / 2
                    i += h
                }
                
                inn2 *= h
            }
            
            resultElem.innerHTML += 'результат = ' + inn.toFixed(4)

        } else

        if (index === 'Метод двойного пересчета 2') {

            resultElem.innerHTML += 'Метод двойного пересчета 2: ' + "<br>"

            hv = E ** (1 / 2)
            hs = 0
            inn = 0
            inn2 = 0

            while (Math.abs(inn2 - inn) <= E ) {

                amount = 0
                amount2 = 0
                hd = hv
                i = a + hs

                while (i < b) {
                    amount += (f(i) + f(i + hv)) / 2
                    i += hd
                }

                inn = amount * hv
                hs = hv / 2
                i = a + hs

                while (i < b) {
                    amount2 += (f(i) + f(i + hv)) / 2
                    i += hd
                }

                inn2 = amount2 * hv
                hs = hv / 2
                hv /= 2
            }

            resultElem.innerHTML +=  'результат = ' + inn.toFixed(4) + ", " + inn2.toFixed(4)

        } else

        resultElem.innerHTML = 'Выберите метод'

    } else

    resultElem.innerHTML = 'Выберите алгоритм'

    function f(x) {
        return x*x
    }
}
// 로딩

window.onload = function () {


    setTimeout(function () {
        let i = 0;
        if (i == 0) {
            i = 1;
            let bar_color = document.querySelector(".bar_color");
            let bar_text= document.querySelector(".bar_text");
            let width = 1;
            let id = setInterval(frame, 10);
            function frame() {
              if (width >= 100) {
                clearInterval(id);
                i = 0;
                setTimeout(function () {
                    location.href = "./home"
                }, 2000);

              } else {
                width++;
                bar_color.style.width = width + "%";
                bar_text.innerHTML = width + "%";
              }
            }
          }
    }, 1800); // 1.8 seconds delay

};

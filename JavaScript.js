    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    var puan = 0;
    var inervalID;
    var tik = 0;
    var saniye = 0;
    var saniyeId;

    function renkInterval() {
            saniyeId = setInterval(sn, 1000);
            inervalID = setInterval(uyariVer, 5000);
    }

    setInterval(function sn() {
        saniye += 1;
    }, 1000);


    setInterval(function uyariVer() {
        var renk1 = Math.floor(255 * Math.random());
        var renk2 = Math.floor(255 * Math.random());
        var renk3 = Math.floor(255 * Math.random());
    
        console.log(renk1);

        document.querySelector('body').style.background = "rgb(" + renk1 + "," + renk2 + "," + renk3 + ")";

    }, 5000); //Arka plan rengini rastgele belirler.


    function flipCard() {
        if (lockBoard) { return; }
        if (this === firstCard) { return; }

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // first click
            hasFlippedCard = true;
            firstCard = this;

            return;
        }

            // second click
            secondCard = this;

            checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        //puan durumu
        if (isMatch) {
            var alan = document.getElementById("puan");
            puan += 10;
            alan.innerHTML = puan;

            if (puan == 60) {
                Swal.fire("Eşleştirme Puanı: " + puan +
                "\n Deneme Sayısı: " + tik + "\n Zaman: " + saniye +"sn" )
            }

        }
        //puan durumu

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
        tik += 1;
    }

    function unflipCards() {
        lockBoard = true;
        tik += 1;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 800);
    }

    function resetBoard() {
        hasFlippedCard = lockBoard = false;
        firstCard = secondCard = null

    }

    (function shuffle() {
         // kartları karıştırma kodu
            cards.forEach(card => {
            const ramdomPos = Math.floor(Math.random() * cards.length);
            card.style.order = ramdomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));



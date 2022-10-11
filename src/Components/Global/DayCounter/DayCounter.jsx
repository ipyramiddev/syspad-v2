import React from 'react';

const DayCounter = () => {
    (function () {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        //I'm adding this section so I don't have to keep updating this pen every year :-)
        //remove this if you don't need it
        let today = new Date(),
            dd = String(today.getDate()).padStart(2, "0"),
            mm = String(today.getMonth() + 1).padStart(2, "0"),
            yyyy = today.getFullYear(),
            nextYear = yyyy + 1,
            dayMonth = "06/05/",
            birthday = dayMonth + yyyy;

        today = mm + "/" + dd + "/" + yyyy;
        if (today > birthday) {
            birthday = dayMonth + nextYear;
        }
        //end

        const countDown = new Date(birthday).getTime(),
            x = setInterval(function () {

                const now = new Date().getTime(),
                    distance = countDown - now;

                document.getElementById("days").innerText = Math.floor(distance / (day))
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour))
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute))
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

                //do something later when date is reached
                if (distance < 0) {
                    // document.getElementById("headline").innerText = "Time is over";
                    // document.getElementById("countdown").style.display = "none";
                    // document.getElementById("content").style.display = "block";
                    // clearInterval(x);
                    document.getElementById("days").innerText = '00'
                    document.getElementById("hours").innerText ='00'
                    document.getElementById("minutes").innerText = '00'
                    document.getElementById("seconds").innerText = '00';
                }
                //seconds
            }, 0)
    }());
    return (
        <div>
            <div className='day-counter pb-4'>
                <ul className='timer'>
                    <li><span id="days"></span>DAY</li>
                    <li><span id="hours"></span>HOUR</li>
                    <li><span id="minutes"></span>MIN</li>
                    <li><span id="seconds"></span>SEC</li>
                </ul>
            </div>
        </div>
    );
};

export default DayCounter;
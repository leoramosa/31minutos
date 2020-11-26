var worldTimeApiSantiago = "http://worldtimeapi.org/api/timezone/America/Santiago";
var functionMomentDateTime = moment().year(2020).month(10).date(11).hour(12).minute(00).second(00);
// setear 1 mes menos del evento
function initCountDown() {
    const interval = setInterval(() => {
        axios
            .get(worldTimeApiSantiago)
            .then(function (response) {
                if (response.status === 200) {
                    var diff = getDiffMomentDatetime(moment(response.data.datetime), functionMomentDateTime);
                    renderCountDown(diff.hours, diff.minutes, diff.seconds);
                    if (diff.hours < 0) {
                        renderCountDown("00", "00", "00");
                        clearInterval(interval);
                    }
                } else {
                    var diff = getDiffMomentDatetime(moment(), functionMomentDateTime);
                    renderCountDown(diff.hours, diff.minutes, diff.seconds);
                    if (diff.hours < 0) {
                        renderCountDown("00", "00", "00");
                        clearInterval(interval);
                    }
                }
            })
            .catch(function (error) {
                var diff = getDiffMomentDatetime(moment(), functionMomentDateTime);
                renderCountDown(diff.hours, diff.minutes, diff.seconds);
                if (diff.hours < 0) {
                    renderCountDown("00", "00", "00");
                    clearInterval(interval);
                }
            })
            .then(function () {});
    }, 1000);
}

function getDiffMomentDatetime(currentMomentDatetime, functionMommentDatetime) {
    const ms = moment(functionMommentDatetime).diff(currentMomentDatetime);
    var d = moment.duration(ms);
    var datediff = Math.floor(d.asHours()) + moment(ms).format(":mm:ss");
    const arrayDiff = datediff.split(":");
    return {
        hours: arrayDiff[0],
        minutes: arrayDiff[1],
        seconds: arrayDiff[2],
    };
}

function renderCountDown(hours, minutes, seconds) {
    document.getElementById("start-hour").innerHTML = hours;
    document.getElementById("start-min").innerHTML = minutes;
    document.getElementById("start-sec").innerHTML = seconds;
}

initCountDown();

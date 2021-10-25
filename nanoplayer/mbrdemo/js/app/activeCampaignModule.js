/*
nanoStream Player
(c) 2015-2020, nanocosmos gmbh
https://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt' or nanocosmos.de/terms)
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/
var activeCampaignModule = (function () {
    var headerWrapper = document.getElementById('headerWrapper');
    let popUpContactBtn = document.getElementById("popUpContact");
    let popUpTrialBtn = document.getElementById("popUpTrial");
    let popUpInfoBtn = document.getElementById("popUpInfo");
    let popUp = document.getElementById('popUp');

    var activeCampaignButtons = [
        {
            text: "MORE INFO",
            url: "https://www.nanocosmos.de/blog/2020/08/nanostream-cloud-4-5-6/"
        },
        {
            text: "CONTACT US",
            url: "https://www.nanocosmos.de/v6/contact"
        },
        {
            text: "FREE TRIAL",
            url: "https://www.nanocosmos.de/blog/freetrial"
        },
    ]

    function init(disableAcTimeout) {

        showActiveCampaingButtons();
        popUpContactBtn.addEventListener( 'click', function (){
            window.open("https://www.nanocosmos.de/v6/contact")
        });
        popUpTrialBtn.addEventListener( 'click', function (){
            window.open("https://www.nanocosmos.de/blog/freetrial")
        });
        popUpInfoBtn.addEventListener( 'click', function (){
            window.open("https://www.nanocosmos.de/blog/2020/08/nanostream-cloud-4-5-6/")
        });

        if (!disableAcTimeout) {

            setTimeout(function (){
                fixFrontElements()
                popUp.style.visibility= 'visible';
                playerModule.togglePlay();
            }, 180000);
        }
    }

    function showActiveCampaingButtons() {
        var showButtons = paramModule.getParamByKey('showAcButtons') === 'true';
        if (showButtons) {
            renderActiveCampgainButtons();
        }
    }

    function renderActiveCampgainButtons() {
        // create button wrapper
        var buttonWrapper = createElement({
            type: "div",
            classes: "text-center mt-4 mb-3"
        });

        // add buttons to wrapper
        activeCampaignButtons.forEach((button, i) => {
            var buttonItem = createElement({
                type: "button",
                textContent: button.text,
                classes: "ac-button col-sm-6 col-lg-2 col-xl-2 mb-2 mb-lg-0",
                clickEvent: {
                    callback: handleClickActiveCampaignButton,
                    data: button
                }
            });
            buttonWrapper.appendChild(buttonItem);
        });

        // insert wrapper to DOM
        headerWrapper.appendChild(buttonWrapper);
    }

    function handleClickActiveCampaignButton(button) {
        window.location = button.url;
    }

    function createElement(props) {
        var elem;

        if (props.type) elem = document.createElement(props.type);
        if (props.textContent) elem.textContent = props.textContent;
        if (props.classes) addClasses(elem, props.classes);
        if (props.clickEvent) elem.addEventListener('click', function(data) {
            props.clickEvent.callback(data)
        }.bind(null, props.clickEvent.data));
        return elem;
    }

    function addClasses(elem, classesString) {
        var classes = classesString.split(" ");

        classes.forEach(c => {
            elem.classList.add(c);
        });
    }

    function fixFrontElements(){
        let items = document.getElementsByClassName('mdl-switch');
        for (let elem of items){
            elem.style.zIndex = 0;
        }
        document.getElementById('playerControlsBottom').style.zIndex = 0;
    }

    return {
        init: init,
    }
}());
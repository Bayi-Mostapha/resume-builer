import './bootstrap';

document.addEventListener('DOMContentLoaded', function () {
    var mainForm = document.getElementById('main-form');
    var mainParsley = $(mainForm).parsley();
    const dLoader = document.getElementById('download-loader');
    const wContainer= document.getElementById('warnings-container');

    //sending the request to download the pdf from js
    mainForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        wContainer.classList.add('hidden');
        dLoader.innerHTML = '<i class="animate-spin fa-solid fa-spinner"></i>';
        const formData = new FormData(this);
    
        axios({
            url: '/download-resume',
            method: 'POST',
            responseType: 'blob',
            data: formData
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'syncareer-resume.pdf');
            link.classList.add('pointer-events-none');
            document.body.appendChild(link);
            link.click();

            dLoader.innerHTML = '<i class="fa-solid fa-check"></i>';
        })
        .catch(error => {
            console.error('Error downloading PDF: ', error);
            dLoader.innerHTML = '';
            wContainer.classList.remove('hidden');
            wContainer.innerHTML='error downloading your resume, please try again!';;
        });
    });

    // **************************************************** 

    var $sections = $('.form-section');
    function navigateTo(index) {

        $sections.removeClass('current').eq(index).addClass('current');

        if (index > 0) {
            $('.previous').css({
                'opacity': '1',
                'pointer-events': 'auto'
            });
        } else {
            $('.previous').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
        }
        var atTheEnd = index >= $sections.length - 1;

        if (!atTheEnd) {
            $('.next').css({
                'opacity': '1',
                'pointer-events': 'auto'
            });
        } else {
            $('.next').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
        }
    }

    function curIndex() {
        return $sections.index($sections.filter('.current'));
    }

    $('.previous').click(function () {
        popUpContainer.classList.add('hidden');
        navigateTo(curIndex() - 1);
    });

    $('.next').click(function () {
        mainParsley.validate();

        if (mainParsley.isValid()) {
            popUpContainer.classList.add('hidden');
            navigateTo(curIndex() + 1);
        }
    });

    $sections.each(function (index, section) {
        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    });

    navigateTo(0);

    // **************************************************** 

    // stop form btns from refreshing the page 
    const addBtns = document.querySelectorAll('.add');
    addBtns.forEach(addBtn => {
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    const popUpContainer = document.getElementById('popup-container');
    const popUp = document.getElementById('popup');
    const popUpContent = document.getElementById('popup-content');
    const closePopUp = document.getElementById('close-popup');
    const popUpBg = document.getElementById('popup-bg');
    const savePopUp = document.getElementById('save-info');

    const exp = document.getElementById('experiences');
    let countexp = 1;
    const edu = document.getElementById('educations');
    let countedu = 1;
    const p = document.getElementById('projects');
    let countp = 1;
    const s = document.getElementById('skills');
    let counts = 1;
    const i = document.getElementById('interests');
    let counti = 1;

    let currStep = '';

    //generatin pop ups
    exp.querySelector('button').addEventListener('click', () => {
        generatePopUp('experiences');
    });

    edu.querySelector('button').addEventListener('click', () => {
        generatePopUp('educations');
    });

    p.querySelector('button').addEventListener('click', () => {
        generatePopUp('projects');
    });

    s.querySelector('button').addEventListener('click', () => {
        generatePopUp('skills');
    });

    i.querySelector('button').addEventListener('click', () => {
        generatePopUp('interests');
    });

    var pForm = document.getElementById('popup-form');
    var popupParsley = $(pForm).parsley();

    // ************************************************************ 

    function generatePopUp(type) {
        popUpContainer.classList.remove('hidden');

        switch (type) {
            case 'experiences':
                currStep = 'experiences';

                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'cname', type: 'text', placeholder: 'company name' },
                    { elem: 'input', id: 'clocation', type: 'text', placeholder: 'company location' },
                    { elem: 'input', id: 'xdate', type: 'date', placeholder: null },
                    { elem: 'input', id: 'xoccupation', type: 'text', placeholder: 'occupation' },
                    { elem: 'textarea', id: 'xdescription', type: null, placeholder: 'description' }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'educations':
                currStep = 'educations';

                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'sname', type: 'text', placeholder: 'school name' },
                    { elem: 'input', id: 'slocation', type: 'text', placeholder: 'school location' },
                    { elem: 'input', id: 'sdate', type: 'date', placeholder: null },
                    { elem: 'input', id: 'sdegree', type: 'text', placeholder: 'degree' },
                    { elem: 'textarea', id: 'sdescription', type: null, placeholder: 'description' }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'projects':
                currStep = 'projects';
                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'ptitle', type: 'text', placeholder: 'project title' },
                    { elem: 'textarea', id: 'pdescription', type: null, placeholder: 'description' }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'skills':
                currStep = 'skills';
                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'skill', type: 'text', placeholder: 'skill' }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'interests':
                currStep = 'interests';
                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'interest', type: 'text', placeholder: 'interest' }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
        }
    }

    function generatePopUpInputs(inputsData) {
        var divElement = document.createElement('div');

        inputsData.forEach(inputData => {
            var input = document.createElement(inputData.elem);

            input.classList.add('input');
            input.setAttribute('id', inputData.id);
            input.setAttribute("required", "");
            if (inputData.type)
                input.setAttribute('type', inputData.type);
            if (inputData.placeholder)
                input.setAttribute('placeholder', inputData.placeholder);
            if (inputData.value){
                if(inputData.elem === 'textarea'){
                    input.textContent = inputData.value;
                } else {
                    input.setAttribute('value', inputData.value);
                }
            }

            divElement.appendChild(input);
        });

        return divElement;
    }

    savePopUp.addEventListener('click', (event) => {
        event.preventDefault();

        popupParsley.validate();
        if (!popupParsley.isValid()) {
            return;
        }

        if(document.getElementById('editId')){
            updateChild();
            popUpContainer.classList.add('hidden');
            return;
        }

        switch (currStep) {
            case 'experiences':
                var divElement = generateInfo(
                    countexp,
                    [
                        { val: 'cname', type: 'title' },
                        { val: 'xoccupation', type: 'occ' },
                        { val: 'clocation', type: 'location' },
                        { val: 'xdate', type: 'date' },
                        { val: 'xdescription', type: 'desc' }
                    ]
                );

                exp.appendChild(divElement);
                countexp++
                break;
            case 'educations':
                var divElement = generateInfo(
                    countedu,
                    [
                        { val: 'sname', type: 'title' },
                        { val: 'sdegree', type: 'occ' },
                        { val: 'slocation', type: 'location' },
                        { val: 'sdate', type: 'date' },
                        { val: 'sdescription', type: 'desc' }
                    ]
                );

                edu.appendChild(divElement);
                countedu++;
                break;
            case 'projects':
                var divElement = generateInfo(
                    countp,
                    [
                        { val: 'ptitle', type: 'title' },
                        { val: 'pdescription', type: 'desc' }
                    ]
                );

                p.appendChild(divElement);
                countp++;
                break;
            case 'skills':
                var divElement = generateInfo(
                    counts,
                    [
                        { val: 'skill', type: 'title' }
                    ]
                );

                s.appendChild(divElement);
                counts++;
                break;
            case 'interests':
                var divElement = generateInfo(
                    counti,
                    [
                        { val: 'interest', type: 'title' }
                    ]
                );

                i.appendChild(divElement);
                counti++;
                break;
        }

        popUpContainer.classList.add('hidden');
    });

    function generateInfo(counter, names) {
        var divElement = document.createElement("div");
        divElement.classList.add('info-slot', 'row');

        var id = 'row' + Date.now();
        divElement.id = id;

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('text-sm', 'text-red-700', 'bg-red-50', 'px-2' , 'py-1', 'rounded');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            deleteChild(e);
        });

        let updateButton = document.createElement('button');
        updateButton.classList.add('text-sm', 'text-green-700', 'bg-green-50', 'px-2' , 'py-1', 'rounded');
        updateButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        updateButton.addEventListener('click', (e) => {
            e.preventDefault();
            editChild(e);
        });

        let actionContainer = document.createElement('div');
        actionContainer.classList.add('flex', 'justify-end', 'gap-2')

        actionContainer.appendChild(deleteButton);
        actionContainer.appendChild(updateButton);

        divElement.appendChild(actionContainer);

        names.forEach(name => {
            var input = document.createElement("input");
            var p = document.createElement("p");

            input.setAttribute("type", "hidden");
            input.setAttribute("name", name.val + counter);
            input.setAttribute("value", document.getElementById(name.val).value);
            input.classList.add(name.type);

            if (name.type === 'title') {
                p.classList.add('font-bold', 'text-2xl', 'text-blue-500', 'capitalize');
            } else if (name.type === 'occ') {
                p.classList.add('text-xl', 'capitalize');
            } else if (name.type === 'date') {
                p.classList.add('text-sm', 'text-gray-500');
                p.innerHTML = '<i class="fa-solid fa-calendar-days"></i> ';
            } else if (name.type === 'location') {
                p.classList.add('text-sm', 'text-gray-500', 'capitalize');
                p.innerHTML = '<i class="fa-solid fa-location-dot"></i> ';
            } else if (name.type === 'desc') {
                p.classList.add('text-sm');
                p.innerHTML = '<span class="font-bold">Description:</span> ';
            }

            p.innerHTML += `<span class="${name.val}i"> ${document.getElementById(name.val).value}</span>`;

            divElement.appendChild(input);
            divElement.appendChild(p);
        });

        return divElement;
    }

    //closing the pop up
    closePopUp.addEventListener('click', () => {
        popUpContainer.classList.add('hidden');
    });
    popUpBg.addEventListener('click', () => {
        popUpContainer.classList.add('hidden');
    });

    // ***************************************************

    function deleteChild(event) {
        event.target.closest('.row').remove();
    }

    function editChild(event) {
        var childDiv = event.target.closest('.row');
        popUpContainer.classList.remove('hidden');

        switch (currStep) {
            case 'experiences':

                var cname = childDiv.querySelector('.title').value;
                var clocation = childDiv.querySelector('.location').value;
                var xdate = childDiv.querySelector('.date').value;
                var xoccupation = childDiv.querySelector('.occ').value;
                var xdescription = childDiv.querySelector('.desc').value;

                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'editId', type: 'hidden', placeholder: null, value: childDiv.id },
                    { elem: 'input', id: 'cname', type: 'text', placeholder: 'company name', value: cname },
                    { elem: 'input', id: 'clocation', type: 'text', placeholder: 'company location', value: clocation },
                    { elem: 'input', id: 'xdate', type: 'date', placeholder: null, value: xdate },
                    { elem: 'input', id: 'xoccupation', type: 'text', placeholder: 'occupation', value: xoccupation },
                    { elem: 'textarea', id: 'xdescription', type: null, placeholder: 'description', value: xdescription }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'educations':

                var sname = childDiv.querySelector('.title').value;
                var slocation = childDiv.querySelector('.location').value;
                var sdate = childDiv.querySelector('.date').value;
                var sdegree = childDiv.querySelector('.occ').value;
                var sdescription = childDiv.querySelector('.desc').value;

                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'editId', type: 'hidden', placeholder: null, value: childDiv.id },
                    { elem: 'input', id: 'sname', type: 'text', placeholder: 'school name', value: sname },
                    { elem: 'input', id: 'slocation', type: 'text', placeholder: 'school location', value: slocation },
                    { elem: 'input', id: 'sdate', type: 'date', placeholder: null, value: sdate },
                    { elem: 'input', id: 'sdegree', type: 'text', placeholder: 'degree', value: sdegree },
                    { elem: 'textarea', id: 'sdescription', type: null, placeholder: 'description', value: sdescription }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'projects':

                var ptitle = childDiv.querySelector('.title').value;
                var pdescription = childDiv.querySelector('.desc').value;

                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'editId', type: 'hidden', placeholder: null, value: childDiv.id },
                    { elem: 'input', id: 'ptitle', type: 'text', placeholder: 'project title', value: ptitle },
                    { elem: 'textarea', id: 'pdescription', type: null, placeholder: 'description', value: pdescription }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'skills':

                var skill = childDiv.querySelector('.title').value;


                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'editId', type: 'hidden', placeholder: null, value: childDiv.id },
                    { elem: 'input', id: 'skill', type: 'text', placeholder: 'skill', value: skill }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
            case 'interests':

                var interest = childDiv.querySelector('.title').value;


                var divElement = generatePopUpInputs([
                    { elem: 'input', id: 'editId', type: 'hidden', placeholder: null, value: childDiv.id },
                    { elem: 'input', id: 'interest', type: 'text', placeholder: 'interest', value: interest }
                ]);

                popUpContent.innerHTML = divElement.innerHTML;
                break;
        }
    }

    function updateChild() {
        var id = document.getElementById('editId').value;
        var child = document.getElementById(id);

        switch (currStep) {
            case 'experiences':
                child.querySelector('.cnamei').innerHTML = document.getElementById('cname').value;
                child.querySelector('.xoccupationi').innerHTML = document.getElementById('xoccupation').value;
                child.querySelector('.clocationi').innerHTML = document.getElementById('clocation').value;
                child.querySelector('.xdatei').innerHTML = document.getElementById('xdate').value;
                child.querySelector('.xdescriptioni').innerHTML = document.getElementById('xdescription').value;
            break;
            case 'educations':
                child.querySelector('.snamei').innerHTML = document.getElementById('sname').value;
                child.querySelector('.sdegreei').innerHTML = document.getElementById('sdegree').value;
                child.querySelector('.slocationi').innerHTML = document.getElementById('slocation').value;
                child.querySelector('.sdatei').innerHTML = document.getElementById('sdate').value;
                child.querySelector('.sdescriptioni').innerHTML = document.getElementById('sdescription').value;
            break;
            case 'projects':
                child.querySelector('.ptitlei').innerHTML = document.getElementById('ptitle').value;
                child.querySelector('.pdescriptioni').innerHTML = document.getElementById('pdescription').value;
            break;
            case 'skills':
                child.querySelector('.skilli').innerHTML = document.getElementById('skill').value;
            break;
            case 'interests':
                child.querySelector('.interesti').innerHTML = document.getElementById('interest').value;
            break;
        }
    }
});
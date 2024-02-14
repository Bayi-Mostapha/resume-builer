<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    @vite('resources/css/app.css')
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.9.2/parsley.min.js" integrity="sha512-eyHL1atYNycXNXZMDndxrDhNAegH2BDWt1TmkXJPoGf1WLlNYt08CSjkqF5lnCRmdm3IrkHid8s2jOUY4NIZVQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://kit.fontawesome.com/a0929f6f84.js" crossorigin="anonymous"></script>
    <style>
        .form-section{
            display: none;
        }
        .form-section.current{
            display: block;
        }
        .parsley-errors-list{
            color:red;
            font-size: 0.75rem;
        }
    </style>
</head>
<body>
    <h1 class="w-fit text-3xl mx-auto my-3 font-extrabold">Resume Builder</h1>
    <form id="main-form" class="my-3 flex justify-evenly items-center gap-2" action="{{ route('resumes.download') }}" method="POST">
        @csrf

        <button type="button" class="previous w-12 h-12 rounded-full border border-gray-400 hover:bg-gray-200">
            <i class="fa-solid fa-chevron-left text-gray-400 text-2xl"></i>
        </button>

        <div class="form-content w-96">
            <div class="form-section w-full h-96 overflow-auto">
                <p class="text-center">Please enter your full name and email so recruter can contact you</p>
                <input type="hidden" name="rid" value="{{$id}}">
                <input required class="input" id="fname" type="text" name="fname" placeholder="first name*">
                <input required class="input" id="lname" type="text" name="lname" placeholder="last name*">
                <input required class="input" id="email" type="text" name="email" placeholder="email*">
                <input class="input" id="phone" type="text" name="phone" placeholder="phone">
                <input class="input" id="occupation" type="text" name="occupation" placeholder="occupation">
                <textarea class="input" name="description" id="description" placeholder="description"></textarea>
            </div>
    
            <div class="form-section w-full h-96 overflow-auto" id="experiences">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Work Experience</h2>
                    <button class="add bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded">+ add</button>
                </div>
            </div>
    
            <div class="form-section w-full h-96 overflow-auto" id="educations">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Education</h2>
                    <button class="add bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded">+ add</button>
                </div>
            </div>
    
            <div class="form-section w-full h-96 overflow-auto" id="projects">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Projects</h2>
                    <button class="add bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded">+ add</button>
                </div>
            </div>
    
            <div class="form-section w-full h-96 overflow-auto" id="skills">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Skills</h2>
                    <button class="add bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded">+ add</button>
                </div>
            </div>
    
            <div class="form-section w-full h-96 overflow-auto" id="interests">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Interests</h2>
                    <button class="add bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded">+ add</button>
                </div>
            </div>

            <div class="form-section w-full h-96">
                <div class="flex flex-col justify-center items-center w-full h-full">
                    <p class="w-fit">All done!</p>
                    <button id="download-btn" class="submit bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-5 rounded" type="submit">
                        <span id="download-loader"></span>
                        Download
                    </button>
                </div>
            </div>
        </div>
        <button type="button" class="next w-12 h-12 rounded-full border border-gray-400 hover:bg-gray-100">
            <i class="fa-solid fa-chevron-right text-gray-400 text-2xl"></i>
        </button>
    </form>
    <div id="popup-container" class="hidden">
        <div id="popup-bg" class="bg-black opacity-20 absolute top-0 left-0 bottom-0 right-0 z-10"></div>
        <div id="popup" class="border border-gray-400 py-2 px-4 bg-gray-100 rounded absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex justify-end">
                <button id="close-popup">
                    <i class="fa-solid fa-xmark text-gray-400 text-xl"></i>
                </button>
            </div>
            <form id="popup-form">
                <div id="popup-content"></div>
        
                <div class="flex justify-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" id="save-info">save</button>
                </div>
            </form>
        </div>
    </div>
    <div id="warnings-container" class="hidden p-2 rounded-md bg-red-100 text-red-500 absolute top-4 left-4"></div>

    @vite('resources/js/app.js')
</body>
</html>
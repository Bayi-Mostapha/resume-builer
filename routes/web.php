<?php

use Dompdf\Dompdf;
use Illuminate\Http\Request;
use App\Events\PlaygroundEvent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/resumes', function () {
    return view('resumes');
})->name('resumes.index');

Route::get('/resumes/{id}', function ($id) {
    return view('resume', compact('id'));
})->name('resumes.create');

Route::post('/download-resume', function (Request $request) {
    $firstName = $request->input('fname');
    $lastName = $request->input('lname');
    $email = $request->input('email');
    $phone = $request->input('phone');
    $occupation = $request->input('occupation');
    $description = $request->input('description');

    $experiences = [];
    $educations = [];
    $projects = [];
    $skills = [];
    $interests = [];

    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'cname') === 0) {
            $index = substr($key, 5); // Extract the index from the key
            $experience = [
                'company_name' => $value,
                'location' => $request->input('clocation' . $index),
                'start_date' => $request->input('xdate' . $index),
                'occupation' => $request->input('xoccupation' . $index),
                'description' => $request->input('xdescription' . $index),
            ];
            $experiences[] = $experience;
        }
    }

    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'sname') === 0) {
            $index = substr($key, 5); // Extract the index from the key
            $education = [
                'school_name' => $value,
                'location' => $request->input('slocation' . $index),
                'start_date' => $request->input('sdate' . $index),
                'degree' => $request->input('sdegree' . $index),
                'description' => $request->input('sdescription' . $index),
            ];
            $educations[] = $education;
        }
    }

    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'ptitle') === 0) {
            $index = substr($key, 6); // Extract the index from the key
            $project = [
                'title' => $value,
                'description' => $request->input('pdescription' . $index),
            ];
            $projects[] = $project;
        }
    }

    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'skill') === 0) {
            $index = substr($key, 5); // Extract the index from the key
            $skill = [
                'name' => $value
            ];
            $skills[] = $skill;
        }
    }

    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'interest') === 0) {
            $index = substr($key, 8); // Extract the index from the key
            $interest = [
                'name' => $value
            ];
            $interests[] = $interest;
        }
    }

    $data = [
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'occupation' => $occupation,
        'description' => $description,
        'experiences' => $experiences,
        'educations' => $educations,
        'projects' => $projects,
        'skills' => $skills,
        'interests' => $interests
    ];
    
    

    $html = View::make('resume-template', compact('data'))->render();
    
    $dompdf = new Dompdf();
    $dompdf->loadHtml($html);

    $dompdf->set_option('defaultPaperSize', 'A4');
    $dompdf->set_option('defaultFont', 'Helvetica');
    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('isPhpEnabled', true);
    $dompdf->set_option('isRemoteEnabled', true);
    $dompdf->set_option('isJavascriptEnabled', true);
    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('dpi', 150);
    $dompdf->set_option('defaultPaperSize', 'a4');
    $dompdf->set_option('isFontSubsettingEnabled', true);
    $dompdf->set_option('isCssFloatEnabled', true);
    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('isPhpEnabled', true);
    $dompdf->set_option('isRemoteEnabled', true);
    $dompdf->set_option('chroot', '/path/to/root');

    $dompdf->render();

    $dompdf->stream('syncareer-resume.pdf', array('Attachment' => 1));

})->name('resumes.download');
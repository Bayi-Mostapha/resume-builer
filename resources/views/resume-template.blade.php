<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="resume" class="container" style="font-family: Arial; background: #fff; margin: 0px auto 0px; box-shadow: 1px 1px 2px #DAD7D7; border-radius: 3px;">
        <div class="header" style="margin-bottom: 5px;">
            <div class="full-name" style="font-size: 40px; text-transform: uppercase; margin-bottom: 5px;">
                <span class="first-name" style="font-weight: 700;">{{ $data['firstName'] }}</span> 
                <span class="last-name" style="font-weight: 300;">{{ $data['lastName'] }}</span>
            </div>
            <div class="contact-info" style="margin-bottom: 5px;">
                <span class="email" style="color: #999; font-weight: 300;">Email: </span>
                <span class="email-val" style="color: #999; font-weight: 300;">{{ $data['email'] }}</span>
                @if(!empty($data['phone']))
                    <span class="separator" style="height: 10px; display: inline-block; border-left: 2px solid #999; margin: 0px 10px;"></span>
                    <span class="phone" style="color: #999; font-weight: 300;">Phone: </span>
                    <span class="phone-val" style="color: #999; font-weight: 300;">{{ $data['phone'] }}</span>
                @endif   
            </div>
            
            <div class="about">
                <p class="position" style="font-weight: bold;">{{ $data['occupation'] }}</p>
                <span class="desc" style="line-height: 20px;">
                    {{ $data['description'] }}
                </span>
            </div>
        </div>
        <div class="details">
            <div class="section" style="margin-bottom: 15px;">
                @if(!empty($data['experiences']))
                    <div class="section__title" style="letter-spacing: 2px; color: #54AFE4; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Experience</div>
                    <div class="section__list" style="margin-bottom: 15px;">
                        @foreach ($data['experiences'] as $experience)
                            <div class="section__list-item" style="margin-bottom: 15px;">
                                <div class="left" style="vertical-align: top; display: inline-block; width: 60%;">
                                    <div class="name" style="font-weight: bold;">{{ $experience['company_name'] }}</div>
                                    <div class="addr">{{ $experience['location'] }}</div>
                                    <div class="duration">{{ $experience['start_date'] }}</div>
                                </div>
                                <div class="right" style="vertical-align: top; display: inline-block; text-align: right; width: 39%;">
                                    <div class="name" style="font-weight: bold;">{{ $experience['occupation'] }}</div>
                                    <div class="desc">{{ $experience['description'] }}</div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
            <div class="section" style="margin-bottom: 15px;">
                @if(!empty($data['educations']))
                    <div class="section__title" style="letter-spacing: 2px; color: #54AFE4; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Education</div>
                    <div class="section__list" style="margin-bottom: 15px;">
                        @foreach ($data['educations'] as $education)
                            <div class="section__list-item" style="margin-bottom: 15px;">
                                <div class="left" style="vertical-align: top; display: inline-block; width: 60%;">
                                    <div class="name" style="font-weight: bold;">{{ $education['school_name'] }}</div>
                                    <div class="addr">{{ $education['location'] }}</div>
                                    <div class="duration">{{ $education['start_date'] }}</div>
                                </div>
                                <div class="right" style="vertical-align: top; display: inline-block; text-align: right; width: 39%;">
                                    <div class="name" style="font-weight: bold;">{{ $education['degree'] }}</div>
                                    <div class="desc">{{ $education['description'] }}</div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
            <div class="section" style="margin-bottom: 15px;">
                @if(!empty($data['projects']))
                    <div class="section__title" style="letter-spacing: 2px; color: #54AFE4; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Projects</div>
                    <div class="section__list" style="margin-bottom: 15px;">
                        @foreach ($data['projects'] as $project)
                            <div class="section__list-item" style="margin-bottom: 15px;">
                                <div class="name" style="font-weight: bold;">{{ $project['title'] }}</div>
                                <div class="text" style="line-height: 20px;">{{ $project['description'] }}</div>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
            <div class="section" style="margin-bottom: 15px;">
                @if(!empty($data['skills']))
                    <div class="section__title" style="letter-spacing: 2px; color: #54AFE4; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Skills</div>
                    <div class="skills" style="margin-bottom: 15px;">
                        @foreach ($data['skills'] as $skill)
                        <div class="skills__item" style="margin-bottom: 5px;">
                            <div class="left" style="vertical-align: top; display: inline-block;">
                                <div class="name" style="font-weight: bold;">{{ $skill['name'] }}</div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                @endif
            </div>
            <div class="section" style="margin-bottom: 15px;">
                @if(!empty($data['interests']))
                    <div class="section__title" style="letter-spacing: 2px; color: #54AFE4; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Interests</div>
                    @foreach ($data['interests'] as $interest)
                    <div class="section__list" style="margin-bottom: 15px;">
                        <div class="section__list-item" style="margin-bottom: 15px;">{{ $interest['name'] }}</div>
                    </div>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
</body>
</html>
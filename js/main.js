(function(global){

	var testApp = {
		tests : [],

		test : function(question, answers, rightAnswers){
			this.question = question;
			this.answers = answers;
			this.rightAnswers = rightAnswers;

		},

		init: function(){
			testApp.createLoginForm();
			testApp.bindEvents();
		},

		createLoginForm: function(){
			var container = document.createElement('div');
			container.setAttribute('class','container');
			var row = document.createElement('div');
			row.setAttribute('class','row');
			container.appendChild(row);

			var col = document.createElement('div');
			col.setAttribute('class','col-md-12');
			row.appendChild(col);

			var h1 = document.createElement('h1');
			h1.innerHTML = 'Enter you name and pass';
			col.appendChild(h1);

			var loginForm = document.createElement('form');
			loginForm.setAttribute('class','student-auto-form form-horizontal well');
			loginForm.setAttribute('action','#');
			//дальше мне лень это все прописывать руками
			loginForm.innerHTML = '<div class="form-group">					<label for="student-name" class="col-sm-2 control-label">Name</label>						<div class="col-sm-10">							<input type="text" name="student-name" id="student-name" class="form-control">						</div>					</div>					<div class="form-group">						<label for="student-pass" class="col-sm-2 control-label">Password</label>						<div class="col-sm-10">							<input type="password" name="student-pass" id="student-pass" class="form-control">						</div>					</div>					<div class="form-group">						<div class="col-sm-offset-2 col-sm-10">							<input type="submit" value="Залогиниться" class="btn btn-primary">						</div>					</div>';
			col.appendChild(loginForm);

			document.body.appendChild(container);
		},

		bindEvents: function(){
			var form = document.querySelector('.student-auto-form');
			form.addEventListener('submit', this.createTest);
		},

		createTest: function(event){
			event.preventDefault();
			if(!testApp.inputValidation()){return };

			testApp.destroyLoginForm(testApp.form);

			var ul = testApp.createTestForm();
			var testForm = ul.parentNode;

			testApp.createQuestionsArray();
				
			for (var i = 0; i < testApp.tests.length; i++) { 
				testApp.renderQuestion(i, ul)
			};

			testApp.renderButtons(testForm);
			
			
		},

		inputValidation : function  () {
			var studentName = document.getElementById('student-name').value;
			var studentPass = document.getElementById('student-pass').value;
			if(studentName == '' || studentPass == ''){ 
				alert('Enter you name and password');
				return false;
			};
			return true;
		},

		destroyLoginForm: function(form){
			var form = document.querySelector('.student-auto-form');
			form.parentNode.parentNode.removeChild(form.parentNode);
		},

		createTestForm: function(){
			var TestForm = document.createElement('form');
			TestForm.setAttribute('class','testForm form-horizontal well');
			TestForm.innerHTML = '<legend>JavaScript Test</legend>';
			var row = document.querySelector('.row');
			row.appendChild(TestForm);

			var ul = document.createElement('ul');
			ul.setAttribute('class','question-list');
			var testForm = document.querySelector('.testForm');
			testForm.appendChild(ul);
			return ul;
		},

		createQuestionsArray : function  () {
			
			testApp.tests[0] = new testApp.test("Укажите имя функции округления вверх?", ['Ceil','math.ceil','Math.ceil'], [0,0,1]);
			testApp.tests[1] = new testApp.test(" Выберите синтаксически правильные варианты создания массива.", ['var a = new [1,2,3];',
				'var a = new Array();',
				'var a = [1,2,3];',
				'var a = new Array(1,2,3);',
				'var a = new Array[1,2,3];'], [0,1,1,1,0]);
			testApp.tests[2] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[3] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[4] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[5] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[6] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[7] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[8] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			testApp.tests[9] = new testApp.test("How are you?", ['good','fine'], [0,1]);
			
		},

		renderQuestion : function  (i, ul) {
			var li = document.createElement('li');
				li.setAttribute('style','list-style:none');
				i++;			
				li.innerHTML += 'Вопрос №'+i;
				i--;
				li.style.paddingBottom = '15px';
				li.style.borderBottom = '1px solid black'
				ul.appendChild(li);

				var questionBox = document.createElement('div');
				questionBox.setAttribute('class','questionBox');
				questionBox.innerHTML = testApp.tests[i].question;
				for (var j = 0; j < testApp.tests[i].answers.length; j++) {
					questionBox.innerHTML += '<label class="checkbox"> <input type="checkbox" value="">'+testApp.tests[i].answers[j]+'</label>';
				};
				document.querySelector('.question-list').childNodes[i].appendChild(questionBox);

		},

		renderButtons : function  (testForm) {
			var submitButton = document.createElement('button');
			submitButton.innerHTML = 'Проверить результаты';
			testForm.appendChild(submitButton);
			testForm.addEventListener('submit',testApp.checkingResults);

			var againButton = document.createElement('button');
			againButton.innerHTML = 'Попробовать еще!';
			var row = document.querySelector('.row');
			againButton.addEventListener('click',testApp.cleanAnswers);
			row.appendChild(againButton);
		},

		checkingResults : function(event){
			var result=0;
			event.preventDefault();
			var questionList = document.querySelector('.question-list');			
			for (var i = 0; i <= questionList.childNodes.length - 1; i++) {
				var res = 0;
				for (var j = 0; j <= testApp.tests[i].answers.length - 1; j++){

					var currentCheckbox = questionList.childNodes[i].childNodes[1].childNodes[j+1].childNodes[1];
					var currentCheckboxParent = currentCheckbox.parentNode;

					if (currentCheckbox.checked > testApp.tests[i].rightAnswers[j])
						{currentCheckboxParent.setAttribute('style','color:red'); res++; }

			   else if (currentCheckbox.checked < testApp.tests[i].rightAnswers[j])
			   			{currentCheckboxParent.setAttribute('style','color:green');res++;}			 
				};

			if (res>0) {result++};	

			};

			alert('You have '+result+' worng answers');
			result = 0;
		},
		cleanAnswers : function(event){
			event.preventDefault();
			var questionList = document.querySelector('.question-list');			
			for (var i = 0; i <= questionList.childNodes.length - 1; i++) {
				for (var j = 0; j <= testApp.tests[i].answers.length - 1; j++){
					var currentCheckbox = questionList.childNodes[i].childNodes[1].childNodes[j+1].childNodes[1];
					var currentCheckboxParent = currentCheckbox.parentNode;

					currentCheckbox.checked = false;
					currentCheckboxParent.setAttribute('style','color:black');
				}			 
			};
			
		}


	};


	global.createTestModule = testApp;
	global.createTestModule.init();
})(window);













document.getElementById('estimate_form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = e.target.name.value;
  var phone = e.target.tel.value;
  var email = e.target.email.value;
  var company = e.target.corp.value;
  var body = e.target.explain.value;
  var type = e.target.type.value;
  var platform = e.target.platform.value;

  if (!name) {
    return alert("이름을 입력하세요.");
  }
  if (!phone) {
    return alert("휴대폰 번호를 입력하세요.");
  }
  if (!email) {
    return alert("이메일을 입력하세요.");
  }
  if (!company) {
    return alert("회사명 혹은 팀 이름을 입력하세요.");
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status == 201) {
      console.log(platform);
      console.log(xhr.responseText);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/assembles');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ name: name, phone: phone, email: email, company: company, body: body, type: type }));

  e.target.name.value = '';
  e.target.tel.value = '';
  e.target.email.value = '';
  e.target.corp.value = '';
  e.target.body.value = '';
  e.target.type.value = '';
});
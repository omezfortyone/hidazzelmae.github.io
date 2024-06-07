function sendMail() {
  var params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }
  emailjs.send("service_gpkxkjs", "template_5idu68h", params).then(function (res) { alert("Success" + res.status);

  })


}
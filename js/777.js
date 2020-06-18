// close button

var myNodelist = document.getElementsByTagName('LI');
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// hide after click
var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = 'none';
  };
}
// add button
function newContact() {
  //View var
  var li = document.createElement('li');
  var br1 = document.createElement('BR');
  var br2 = document.createElement('BR');
  var br3 = document.createElement('BR');
  var br4 = document.createElement('BR');
  //getting values
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var mobile = document.getElementById('mobile').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  //view values
  var t1 = document.createTextNode('First Name: ' + firstname);
  var t2 = document.createTextNode('Last Name: ' + lastname);
  var t3 = document.createTextNode('Mobile No: ' + mobile);
  var t4 = document.createTextNode('E-mail: ' + email);
  var t5 = document.createTextNode('Address: ' + address);
  //toast
  var toast = document.getElementById('toast');
  var toast2 = document.getElementById('toast2');
  //append view values
  li.appendChild(t1);
  li.appendChild(br1);
  li.appendChild(t2);
  li.appendChild(br2);
  li.appendChild(t3);
  li.appendChild(br3);
  li.appendChild(t4);
  li.appendChild(br4);
  li.appendChild(t5);

  //empty conditions
  if (firstname === '' || lastname === '' || mobile === '' || email === '') {
    //toast to invalid input
    toast.className = 'show';
    setTimeout(function () {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  } else {
    //add to view section
    document.getElementById('myUL').appendChild(li);
    //success toast
    toast2.className = 'show';
    setTimeout(function () {
      toast2.className = toast2.className.replace('show', '');
    }, 3000);
  }
  //set to null after adding
  document.getElementById('firstname').value = '';
  document.getElementById('lastname').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('email').value = '';
  document.getElementById('address').value = '';

  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = 'none';
    };
  }
}

var elements = document.getElementsByClassName('rmNote');
let notes = JSON.parse(localStorage.getItem('notes')) || [];

const template = (time, date, note, id) => `<p>
    <b>Created At:</b> ${time}<br />
    <b>Date created:</b> ${date}<br />
    <b>Your note:</b><br />
    ${note}
    <span class="close rmNote" data-note-id="${id}">\u00D7</span>
    </p>`;

function readNotes() {
  let container = document.getElementById('addtext');

  let inner = '';
  notes.forEach((e, i) => {
    inner += template(e.time, e.date, e.note, i);
  });

  container.innerHTML = inner;
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', removeNote, false);
  }
}

function newNote() {
  const dateCreated = new Date();
  const note = document.getElementById('note').value;

  if (!note) {
    toast3.className = 'show';
    setTimeout(function () {
      toast3.className = toast3.className.replace('show', '');
    }, 3000);
  } else {
    notes = [
      ...notes,
      {
        note,
        time: `${dateCreated.getHours()}:${dateCreated.getMinutes()}`,
        date: `${dateCreated.getDate()} ${dateCreated.toLocaleString(
          'default',
          {
            month: 'long',
          },
        )} ${dateCreated.getFullYear()}`,
      },
    ];
    localStorage.setItem('notes', JSON.stringify(notes));
    let container = document.getElementById('addtext');
    let inner = '';
    notes.forEach((e, i) => {
      inner += template(e.time, e.date, e.note, i);
    });
    container.innerHTML = inner;
    toast4.className = 'show';
    setTimeout(function () {
      toast4.className = toast4.className.replace('show', '');
    }, 3000);
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', removeNote, false);
    }
  }
}

function removeNote() {
  var noteId = this.getAttribute('data-note-id');
  notes.splice(noteId, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  readNotes();
}

//Funtion for Read data of Tabs
function openTab(evt, tabName) {
  var data, content, tab;
  content = document.getElementsByClassName('content');
  for (data = 0; data < content.length; data++) {
    content[data].style.display = 'none';
  }
  tab = document.getElementsByClassName('tab');
  for (data = 0; data < tab.length; data++) {
    tab[data].className = tab[data].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
//default tab
document.getElementById('defaultOpen').click();

//open popup add
function openaddcon() {
  document.getElementById('popupform').style.display = 'block';
}
//close popup add
function closeaddcon() {
  document.getElementById('popupform').style.display = 'none';
}
//open popup note
function openaddnot() {
  document.getElementById('popupnote').style.display = 'block';
}
//close pop up note
function closenote() {
  document.getElementById('popupnote').style.display = 'none';
}

readNotes();

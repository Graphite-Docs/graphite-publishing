import { setGlobal, getGlobal } from 'reactn';

export async function darkMode() {
    if(getGlobal().darkmode === false) {
      let editor = await document.getElementsByClassName('note-editable')[0];
      setGlobal({ darkmode: true });
      document.getElementsByClassName('main-container')[0].style.background = '#282828';
      document.getElementById('back-arrow').style.color = "#fff";
      document.getElementById('title-input').style.color = "#fff";
      document.getElementById('title-input').style.background = "#282828";
      document.getElementById('title-input').style.border = "0.5px solid #fff";
      document.getElementById('single-post-header').style.background = '#282828';
      document.getElementById('single-post-header').style.color = '#fff';
      document.getElementsByClassName('note-editor')[0].style.background = '#282828';
      document.getElementsByClassName('note-editor')[0].style.background = '#282828';
      document.getElementsByClassName('note-toolbar')[0].style.background = '#282828';
      document.getElementById('side-nav').style.background = "#282828";
      document.getElementById('side-nav-close').style.color = "#fff";
      document.getElementById('side-nav-heading').style.color = "#fff";
      document.getElementById('side-nav-image-heading').style.color = "#fff";
      document.getElementById('side-nav-publish').style.color = "#fff";
      document.getElementById('side-nav-custom').style.color = "#fff";
      document.getElementById('footer-settings').style.color = "#fff";
      document.getElementById('footer-expand').style.color = "#fff";
      document.getElementById('footer-dark').style.color = "#fff";
      document.getElementById('footer-words').style.color = "#fff";
      editor.style.background = '#282828';
      editor.style.color = '#fff';
      document.getElementsByClassName('bottom-post-nav')[0].style.color = '#fff';
      document.getElementsByClassName('bottom-post-nav')[0].style.background = '#282828';
      document.getElementsByTagName("BODY")[0].style.background = '#282828';
      var noteBtn = document.getElementsByClassName('note-btn');
        for (var i = 0; i < noteBtn.length; ++i) {
            var item = noteBtn[i];
            item.style.background = '#282828';
            item.style.color = '#fff';
            item.style.border = 'none';
        }

      var paras = document.getElementsByTagName("p");
        for (var b=0; b < paras.length; b++) {
          var name = paras[b];
          name.style.color = '#fff';
        }

      var bottomLinks = document.getElementsByClassName('bottom-nav-link');
        for (var a = 0; a < bottomLinks.length; ++a) {
            var ax = bottomLinks[a];
            ax.style.color = '#fff';
        }
    } else {
      setGlobal({ darkmode: false });
      document.getElementsByClassName('main-container')[0].style.background = '#fff';
      document.getElementById('back-arrow').style.color = "#000";
      document.getElementById('title-input').style.color = "#000";
      document.getElementById('title-input').style.background = "#fff";
      document.getElementById('title-input').style.border = "0.5px solid #eee";
      document.getElementById('single-post-header').style.background = '#fff';
      document.getElementById('single-post-header').style.color = '#000';
      document.getElementById('side-nav').style.background = "#fff";
      document.getElementById('side-nav-close').style.color = "#000";
      document.getElementById('side-nav-heading').style.color = "#000";
      document.getElementById('side-nav-image-heading').style.color = "#000";
      document.getElementById('side-nav-publish').style.color = "#000";
      document.getElementById('side-nav-custom').style.color = "#000";
      document.getElementsByClassName('note-editor')[0].style.background = '#fff';
      document.getElementsByClassName('note-editor')[0].style.background = '#fff';
      document.getElementsByClassName('note-toolbar')[0].style.background = '#fff';
      document.getElementsByClassName('note-editable')[0].style.background = '#fff';
      document.getElementsByClassName('note-editable')[0].style.color = '#000';
      document.getElementsByClassName('bottom-post-nav')[0].style.color = '#000';
      document.getElementsByClassName('bottom-post-nav')[0].style.background = '#fff';
      document.getElementById('footer-settings').style.color = "#000";
      document.getElementById('footer-expand').style.color = "#000";
      document.getElementById('footer-dark').style.color = "#000";
      document.getElementById('footer-words').style.color = "#000";
      document.getElementsByTagName("BODY")[0].style.background = '#fff';
      noteBtn = document.getElementsByClassName('note-btn');
        for (i = 0; i < noteBtn.length; ++i) {
            item = noteBtn[i];
            item.style.background = '#fff';
            item.style.color = '#000';
            item.style.border = '1px solid #fff';
        }

        var paraEl = document.getElementsByTagName("p");
          for (var c=0; c < paraEl.length; c++) {
            var pName = paraEl[c];
            pName.style.color = '#000';
          }

        bottomLinks = document.getElementsByClassName('bottom-nav-link');
          for (a = 0; a < bottomLinks.length; ++a) {
              ax = bottomLinks[a];
              ax.style.color = '#000';
          }
    }
  }

  export function expand() {
    if(getGlobal().fullscreen === false) {
      setGlobal({fullscreen: true});
      document.getElementsByClassName('note-toolbar')[0].style.display = 'none';
      document.getElementById('single-post-header').style.display = 'none';
      document.getElementsByClassName('note-editor')[0].style.top = '50px';
      document.getElementsByClassName('bottom-post-nav')[0].style.display = 'none';
    } else {
      setGlobal({fullscreen: false});
      document.getElementsByClassName('note-toolbar')[0].style.display = 'block';
      document.getElementById('single-post-header').style.display = 'flex';
      document.getElementsByClassName('note-editor')[0].style.top = '150px';
      document.getElementsByClassName('bottom-post-nav')[0].style.display = 'flex';
    }
  }
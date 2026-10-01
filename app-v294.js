/* v29.4 英語音声ボタン修正：Android/Chrome対応 */
(function(){
  function speakEnglish294(text){
    try{
      if(!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance){
        alert("この端末では音声読み上げを利用できません。");
        return;
      }
      const synth=window.speechSynthesis;
      synth.cancel();

      const u=new SpeechSynthesisUtterance(String(text||""));
      u.lang="en-US";
      u.rate=0.78;
      u.pitch=1.0;
      u.volume=1.0;

      const voices=synth.getVoices ? synth.getVoices() : [];
      const en=voices.find(v=>/^en-US/i.test(v.lang)) ||
               voices.find(v=>/^en/i.test(v.lang));
      if(en) u.voice=en;

      /* Android Chromeでcancel直後のspeakが落ちることがあるため少し待つ */
      setTimeout(()=>{
        try{
          synth.resume();
          synth.speak(u);
        }catch(err){
          console.error("English speech error",err);
        }
      },80);
    }catch(err){
      console.error("English speech setup error",err);
    }
  }

  /* v29.2 が呼ぶ関数名を必ず有効化 */
  window.speakEN=speakEnglish294;
  try{ speakEN=speakEnglish294; }catch(e){}

  /* v29.2画面を再定義し、音声ボタン自身に確実に処理を持たせる */
  if(typeof engHome292==="function"){
    engHome292=function(g,t){
      let d=engData292(g,t); if(!d)return false;
      eng292={g,t,d,i:0,ok:0,start:Date.now()};
      head(`${g<=4?"外国語活動":"外国語"}｜${t}`,()=>subjectGradeTerms("外国語",g));
      A.append(e("div","card",`<div class="tiny">${g<=4?"外国語活動":"外国語"}｜小学${g}年</div><h2>${t}</h2><div class="engFlow292"><span>👂 きく</span><b>→</b><span>🗣️ まねする</span><b>→</b><span>💬 つかう</span><b>→</b><span>😊 伝わる</span></div><h3>この単元でやってみること</h3><p>${d[0]}</p><p class="engPhrase292">${d[1]}</p>`));
      A.append(btn("🔊 英語を聞く",()=>speakEnglish294(d[1]),"soft"));
      A.append(btn("📖 ①まなぶ",engLearn292,"primary"));
    };

    engLearn292=function(){
      let s=eng292,d=s.d;
      head(`①まなぶ｜${s.t}`,()=>engHome292(s.g,s.t));
      A.append(e("div","card lesson",`<h2>👂 ① きいて・まねしよう</h2><p class="engPhrase292">${d[1]}</p><p><b>こたえ方の例</b></p><p class="engPhrase292">${d[2]}</p><p>${d[3]}</p>`));
      A.append(btn("🔊 質問を聞く",()=>speakEnglish294(d[1]),"soft"));
      A.append(btn("🔊 答えを聞く",()=>speakEnglish294(d[2]),"soft"));
      A.append(btn("➡️ ② 一緒にやってみる",engTogether292,"primary"));
    };

    engTogether292=function(){
      let s=eng292,d=s.d;
      head(`②一緒に｜${s.t}`,engLearn292);
      A.append(e("div","card lesson",`<h2>🤝 ② 一緒に言ってみよう</h2><p>① 質問を聞く</p><p class="engPhrase292">${d[1]}</p><p>② まねして答える</p><p class="engPhrase292">${d[2]}</p><p class="tiny">全部言えなくても大丈夫。聞く→まねする→自分の言葉に変える、で進めます。</p>`));
      A.append(btn("🔊 会話を聞く",()=>{
        speakEnglish294(d[1]);
        setTimeout(()=>speakEnglish294(d[2]),2200);
      },"soft"));
      A.append(btn("➡️ ③ 自分でやってみる",engSelf292,"primary"));
    };
  }

  /* 音声エンジンを先に起こしておく */
  if("speechSynthesis" in window){
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
  }
})();
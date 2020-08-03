/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string} 診断結果
 **/


(function(){
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () =>{  
  const userName = userNameInput.value;
  if(userName.length===0){
    return;
  }
  console.log(userName);

  /*指定した要素の子要素を全て削除する
  *@param{HTMLElement} element HTMLの要素
  */
  function removeAllChildren(element){
    while(element.firstChild){//子要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }
  /* ここでいうelement.firstchildは<h3>診断結果</h3> */

  //診断結果表示エリアの作成
  removeAllChildren(resultDivided);

  const header = document.createElement('h3');
  header.innerText = '診断結果';  
  /*<h3>診断結果</h3> */
  resultDivided.appendChild(header);
  /** <div id="result-area"> 
   * <h3>診断結果</h3> 
   *  </div> */

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);
/** <div id="result-area"> 
 *  <h3>診断結果</h3> 
 * <p> いいところは～～</p>
   </div> */


  //TODO ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href',hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.innerText = 'Tweet hoge';
  tweetDivided.appendChild(anchor);
  twttr.widgets.load();

};

  const answers =[
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になってしかたないでしょう。　',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。　',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。　',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。　',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しませます。　',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。　',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。　',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。　',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。　',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。　',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。　',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。　',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人をすくっています。　',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。　',
    '{userName}のいいところは自制心です。まずいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。　'

  ];

  /**
   * 名前の文字列を渡すと診断結果を返す
   * @param {String} userName 
   * @return{String} 診断結果
   */
  function assessment(userName){
    // 全文字コード番号を取得して足し合わせる
    let sumOfcharCode=0;
    for(let i=0;i<userName.length;i++){
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    //　文字のコード番号の合計を回答の数(16)で割って添え字の数値を求める

    const index = sumOfcharCode % answers.length;
    //const result = answers[index];
    console.log('index ' + index);
    //TODO {userName}をユーザーの名前に置き換える
    let result = answers[index];
    console.log('result '+result);
    result = result.replace(/\{userName\}/g ,userName);
    console.log('result ' +result);
    return result;
    // 
  }
  //テストコード
  console.assert(
    assessment('太郎') ==='太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。　','診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎')===assessment('太郎'),'入力が同じなら同じ診断結果を出力する処理が正しくありません。'
  );


})();


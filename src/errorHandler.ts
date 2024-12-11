export const setError = (text: string) => {
  const errorParagraphElement: HTMLElement = document.querySelector(".error_paragraph");
  errorParagraphElement!.style.display = "block";
  if(text === "<=0"){
    errorParagraphElement!.innerHTML =  `Значение меньше или равно нулю`;
  } else {
    const translatedFieldName: string = text === "value"? "Значение" : "Текст"
    errorParagraphElement!.innerHTML =  `Поле "${translatedFieldName}" не заполнено`;
  }


  setTimeout(() => {
    errorParagraphElement!.style.display = "none";
  }, 3000);
}

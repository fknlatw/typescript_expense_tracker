import { v4 as uuidv4 } from 'uuid';
import { setError } from "./errorHandler.ts";
import { IncomeExpense } from "./interfaces.ts";


export class IncomeExpensesUI {
  private IncomeExpenseList: IncomeExpense[] = JSON.parse(
    localStorage.getItem("IncomeExpenseList")
  ) || [];

  render(){
    const incomeExpenseListElement: HTMLElement = document.querySelector(".expense_income_list");
    if(this.IncomeExpenseList.length === 0){
      incomeExpenseListElement.innerHTML = `<li>Нет данных...</li>`;
      document.querySelector(".total_expenses span")!.innerHTML = 0;
      document.querySelector(".total_income span")!.innerHTML = 0;
      document.querySelector(".total span")!.innerHTML = 0;
      return;
    }
    incomeExpenseListElement!.innerHTML = this.IncomeExpenseList.map((item) => {
        return  `
          <li
            class="list_item ${item.type}"
            id=${item.id}
          >

            <div>
              <p>${item.text}</p>
              <button class="delete_button">Удалить</button>
              <button class="edit_button">Изменить</button>
            </div>

            <span>${item.value}</span>
            <p>${item.type === "income"? "Приход" : "Расход"}</p>
          </li>
        `
    }).join("");

    this.setCounts();
  }

  addItem(e: HTMLEvent){
    const incomeExpenseAddForm: HTMLFormElement = document.querySelector(".expense_income_add_form");
    const incomeExpenseData = new FormData(incomeExpenseAddForm);

    for(let [name] of incomeExpenseData){
      if(!incomeExpenseData.get(name)){
        setError(name);
        return;
      }
    }

    if(incomeExpenseData.get("value") <= 0){
      setError("<=0");
      return;
    }

    const newItem: IncomeExpense = {
      id: uuidv4(),
      value: Number(incomeExpenseData.get("value")),
      text: incomeExpenseData.get("text"),
      type: incomeExpenseData.get("type")
    }

    this.IncomeExpenseList.unshift(newItem);
    localStorage.setItem("IncomeExpenseList", JSON.stringify(this.IncomeExpenseList));
    this.render();

    Array.from(
      incomeExpenseAddForm.querySelectorAll("input")
    ).forEach((input) => {
      input.value = "";
    });

    document.querySelector(".expense_income_list").scroll({top: 0})
  }

  addListeners(){
    document
      .querySelector(".expense_income_add_form")
      .addEventListener("submit",(e) => {
        e.preventDefault()
        const buttonText: string = e.target[3].innerHTML;

        if(buttonText === "Добавить"){
          this.addItem(e)
        }
        if(buttonText === "Изменить"){
          this.changeItem(e, document.querySelector(".expense_income_add_form p").innerHTML)
        }


      });

    document.addEventListener("click", (e: HTMLEvent) => {
      if(e.target.classList.contains("delete_button")){
        const targetId = e.target.parentElement.parentElement.id;
        this.deleteItem(targetId);
      }

      if(e.target.classList.contains("edit_button")){
        const targetId = e.target.parentElement.parentElement.id;
        this.fillInputs(targetId);
      }

      if(e.target.classList.contains("developer")
      || e.target.parentElement.classList.contains("developer")){
        this.toggleDevInfo();
      }
    })
  }

  changeItem(e: HTMLEvent, id: string){
    const incomeExpenseData = new FormData(e.target)

    for(let [name] of incomeExpenseData){
      if(!incomeExpenseData.get(name)){
        setError(name);
        return;
      }
    }

    if(incomeExpenseData.get("value") <= 0){
      setError("<=0");
      return;
    }

    this.IncomeExpenseList = this.IncomeExpenseList.map(item => {
      if(item.id === id){
        return {
          id: item.id,
          value: Number(incomeExpenseData.get("value")),
          text: incomeExpenseData.get("text"),
          type: incomeExpenseData.get("type")
        }
      }
      return item
    });

    localStorage.setItem("IncomeExpenseList", JSON.stringify(this.IncomeExpenseList));
    this.render();

    Array.from(
      e.target.querySelectorAll("input")
    ).forEach((input) => {
      input.value = "";
    });

    document.querySelector(".expense_income_add_form")[3]!.innerHTML = "Добавить";
    document.querySelector(".expense_income_add_form p")!.innerHTML = "";
  }

  deleteItem(id: string){
    this.IncomeExpenseList = this.IncomeExpenseList.filter((item) => item.id !== id);
    localStorage.setItem("IncomeExpenseList", JSON.stringify(this.IncomeExpenseList));
    this.render();
  }

  fillInputs(id: string){
    const currentItem: IncomeExpense = this.IncomeExpenseList.find((item)=>item.id === id);
    document.querySelector(".expense_income_add_form")[0]!.value = currentItem.value;
    document.querySelector(".expense_income_add_form")[1]!.value = currentItem.text;
    document.querySelector(".expense_income_add_form")[2]!.value = currentItem.type;
    document.querySelector(".expense_income_add_form")[3]!.innerHTML = "Изменить";
    document.querySelector(".expense_income_add_form p")!.innerHTML = currentItem.id;
    Array.from(
      document.querySelectorAll(".expense_income_list .list_item button")
    ).forEach(btn=>{
      btn.disabled = true;
    });
  }

  setCounts(){
    let totalIncomeCounter = 0;
    let totalExpenseCounter = 0;

    this.IncomeExpenseList.map((item)=>{
      switch(item.type){
        case "expense": {
          totalExpenseCounter += item.value;
          break;
        }
        case "income": {
          totalIncomeCounter += item.value;
          break;
        }
      }
    });

    document.querySelector(".total_expenses span")!.innerHTML = totalExpenseCounter;
    document.querySelector(".total_income span")!.innerHTML = totalIncomeCounter;
    document.querySelector(".total span")!.innerHTML = totalIncomeCounter - totalExpenseCounter;
  }

  toggleDevInfo(){
     document.querySelector(".dev_info_banner").classList.toggle("hide");
  }
}

import './style.css';
import {IncomeExpensesUI} from "./incomeExpensesUI.ts";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <div class="left_side_wrapper">
      <div class="totals">
        <div class="total_expenses">
          <h5>Расход</h5>
          <span>0</span>
        </div>
        <div class="total">
          <h5>Остаток</h5>
          <span>0</span>
        </div>
        <div class="total_income">
          <h5>Приход</h5>
          <span>0</span>
        </div>
      </div>
      <form class="expense_income_add_form">
        <label for="value">Значение</label>
        <input
          type="number"
          name="value"
          onkeyup="this.value = this.value.replace(/[^0-9]/g, '');"
        >
        <label for="value">Текст</label>
        <input type="text" name="text">
        <label for="type">Тип</label>
        <select name="type">
          <option value="expense">Расход</option>
          <option value="income">Приход</option>
        </select>
        <button type="submit">Добавить</button>
        <p class="error_paragraph"></p>
      </form>
    </div>

    <ul class="expense_income_list"></ul>

    <button class="developer">
      <i class="fa-solid fa-code"></i>
    </button>

    <div class="dev_info_banner hide">
      <div class="dev_info">
        <span>FLATW 2024</span>

        <div class="stack_grid">
          <div>СТЭК:</div>
          <div>CSS</div>
          <div>TS</div>
          <div>HTML</div>
        </div>
      </div>
    </div>
  </div>
`;

const incomeExpenseUIClass = new IncomeExpensesUI();

incomeExpenseUIClass.render();
incomeExpenseUIClass.addListeners();

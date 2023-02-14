// Компонент приймає один проп onSubmit –
// функцію для передачі значення інпута
// під час сабміту форми.Створює DOM - елемент наступної структури.

<header class="searchbar">
  <form class="form">
    <button type="submit" class="button">
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>;

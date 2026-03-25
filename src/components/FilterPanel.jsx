import { categories } from '../data/categories';

export default function FilterPanel({ active, setActive }) {
  return (
    <div className="filter-panel">
      <button
        className={active === 'All' ? 'filter active' : 'filter'}
        onClick={() => setActive('All')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={active === category ? 'filter active' : 'filter'}
          onClick={() => setActive(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

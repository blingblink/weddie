import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import ListPage from '../../ListPage';
import Table from '../../Table';

export default function FoodSelectMenu(props) {
	const {
		dishes,
		dishesForWedding,
		setDishesForWedding,
	} = props;
  const [unchosenDishes, setUnchosenDishes] = useState(
    dishes.filter(dish => dishesForWedding.findIndex(dishForWedding => dishForWedding.id === dish.id))
  );

	const onRowSelect = async (rowIdx) => {
		// Add dish to the dishes for wedding
		const dish = unchosenDishes[rowIdx];
    setDishesForWedding([
    	...dishesForWedding,
    	{
    		...dish,
    		servingOrder: 1,
    	},
    ]);

    // Remove dish from unchosen dishes
    setUnchosenDishes(unchosenDishes.filter((dish, idx) => idx !== rowIdx));
  };

  const onUpdate = async (dish) => {
    const dishIdx = dishesForWedding.findIndex(dishForWedding => dishForWedding.id === dish.id);
    const newDishesForWedding = [...dishesForWedding];
    newDishesForWedding[dishIdx] = dish;
    setDishesForWedding(newDishesForWedding);
  };

  const onDelete = async (deletedDish) => {
    setDishesForWedding(dishesForWedding.filter(dish => dish.id !== deletedDish.id));
    setUnchosenDishes([...unchosenDishes, deletedDish]);
  }


	const columns = [
    {
      key: 'name',
      label: 'Tên món ăn',
      type: 'text',
      disabled: true,
    },
    {
      key: 'price',
      label: 'Giá tiền',
      type: 'number',
      disabled: true,
    },
    {
    	key: 'servingOrder',
      label: 'Trình tự mang đồ ăn',
      type: 'number',
    }
  ]

  const columnsTable = columns.filter((col, idx) => idx < 2);
  const rowsTable = unchosenDishes.map(dish => columnsTable.map(col => dish[col.key]));

  return (
    <div>
    	<ListPage
	    	pageTitle="Món ăn trong tiệc cưới"
	      smallPageTableName="Các món ăn"
	      columns={columns}
	      values={dishesForWedding}
	      onUpdate={onUpdate}
	      onDelete={onDelete}
	    />
	    <div className="min-w-0 flex-1 py-4 px-1 mt-4">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Món ăn có thể thêm vào tiệc cưới</h1>
      </div>
	    <Table
	    	tableName="Các món ăn của nhà hàng"
	    	columns={columnsTable}
	    	rows={rowsTable}
	    	onRowSelect={onRowSelect}
		    selectText="Thêm"
	    />
    </div>
  );
}
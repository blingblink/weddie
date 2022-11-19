import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import ListPage from '../../ListPage';
import Table from '../../Table';

export default function ServiceSelectMenu(props) {
	const {
		services,
		servicesForWedding,
		setServicesForWedding,
	} = props;
	const [unchosenServices, setUnchosenServices] = useState(services);

	const onRowSelect = async (rowIdx) => {
		// Add service to the wedding
		const service = unchosenServices[rowIdx];
    setServicesForWedding([
    	...servicesForWedding,
      service,
    ]);

    // Remove service from unchosen services
    setUnchosenServices(unchosenServices.filter((service, idx) => idx !== rowIdx));
  };

  const onUpdate = async (service) => {
    const serviceIndex = servicesForWedding.findIndex(serviceForWedding => serviceForWedding.id === service.id);
    const newValues = [...servicesForWedding];
    newValues[serviceIndex] = service;
    setServicesForWedding(newValues);
  };

  const onDelete = async (deletedService) => {
    setServicesForWedding(servicesForWedding.filter(service => service.id !== deletedService.id));
    setUnchosenServices([...unchosenServices, deletedService]);
  }


	const columns = [
    {
      key: 'name',
      label: 'Tên dịch vụ',
      type: 'text',
      disabled: true,
    },
    {
      key: 'price',
      label: 'Giá tiền',
      type: 'number',
      disabled: true,
    },
  ]
  const rows = unchosenServices.map(service => columns.map(col => service[col.key]));

  return (
    <div>
    	<ListPage
	    	pageTitle="Dịch vụ trong tiệc cưới"
	      smallPageTableName="Các dịch vụ"
	      columns={columns}
	      values={servicesForWedding}
	      onUpdate={onUpdate}
	      onDelete={onDelete}
	    />
	    <div className="min-w-0 flex-1 py-4 px-1 mt-4">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Dịch vụ có thể thêm vào tiệc cưới</h1>
      </div>
	    <Table
	    	tableName="Các dịch vụ của nhà hàng"
	    	columns={columns}
	    	rows={rows}
	    	onRowSelect={onRowSelect}
		    selectText="Thêm"
	    />
    </div>
  );
}
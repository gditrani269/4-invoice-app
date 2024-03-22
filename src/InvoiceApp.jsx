import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0,
    },
    //items va a ser un arreglo ya que una factura puede tener varios items
    items: []
}

export const InvoiceApp = () => {

    const [ activeForm, setActiveForm ] = useState (false);

    const [ total, setTotal ] = useState (0);

    const [counter, setCounter] = useState (4);

    const [ invoice, setInvoice ] = useState (invoiceInitial);

    const [items, setItems] = useState([]);

    const { id, name, client, company} = invoice;

    //solo se ejecuta una vez cuando se crea el componente
    useEffect(() => {   
        const data = getInvoice ();
        console.log (invoice);
        setInvoice (data);
        setItems (data.items);
    }, []);
    //si el useEffect como segundo parametro tiene solo los [] se ejecuta solo cuando se crea el componente
    //pero si quiero que se por otro evento se puede hacer.


    useEffect (() => {
//        console.log ("El counter cambio");
    }, [counter]);

    useEffect (() => {
        setTotal (calculateTotal (items))
//        console.log ("los items cambiaron");
    }, [items]);



    const handlerAddItems = ({product, price, quantity}) => {

        setItems ([...items, {
            id: counter,
            product: product.trim (), 
            price: +price.trim (), 
            quantity: +quantity.trim ()
        }]);

        setCounter (counter + 1);
    }

    const handlerDeleteItem = (id) => {
        setItems (items.filter (item => item.id !== id))
    }

    const onActiveForm = () => {
        setActiveForm (!activeForm);
    }

    return (
        <>
        <div className="container">

            <div className="card my-3">

                <div className="card-header">
                    Ejemplo Factura
                </div>
                <div className="card-body">
                    <InvoiceView id={ id } name={ name }/>

                    <div className="row my-3">
                        <div className="col">
                        </div>
                            <ClientView title="Datos del cliente" client={ client }/>

                        <div className="col">
                            <CompanyView title="Datos de la empresa" company= {company}/>
                        </div>
                    </div>
                    <ListItemsView title="Productos de la factura" items={items} handlerDeleteItem={ id => handlerDeleteItem (id)}/>
                    <TotalView total = { total } />
                    <button className="btn btn-secondary"
                    onClick={ onActiveForm }>{ !activeForm ? 'Agregar Item': 'Ocultar Form'}</button>
                    { !activeForm? '': <FormItemsView handler={ (newItem) => handlerAddItems (newItem)}/>}
                </div>
            </div>
        </div>
        </>
    )
}
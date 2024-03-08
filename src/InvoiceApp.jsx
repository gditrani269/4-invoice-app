import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

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

    const [ total, setTotal ] = useState (0);
    const [counter, setCounter] = useState (4);

    const [ invoice, setInvoice ] = useState (invoiceInitial);

    const [items, setItems] = useState([]);

    const [formItemsStates, setFormItemsStates] = useState ({
        product: '',
        price: '',
        quantity: '',
    });

    const { id, name, client, company} = invoice;

    const { product, price, quantity } = formItemsStates;

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
//        console.log ("El precio cambio");
    }, [price]); //aca se dispara el evento cada vez que se hace un cambio en price

    useEffect (() => {
//        console.log ("El FORM cambio");
    }, [formItemsStates]);//si cambia cualquier campo del formulario se dispara este evento, ya que se pudo el nombre del form.

    useEffect (() => {
//        console.log ("El counter cambio");
    }, [counter]);

    useEffect (() => {
        setTotal (calculateTotal (items))
//        console.log ("los items cambiaron");
    }, [items]);

    const onInputChange = ( {target: {name, value}}) => {
//        console.log (name)
//        console.log (value)

        setFormItemsStates ({
            ...formItemsStates,
            [ name ]: value
        });
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault ();

        if (product.trim().length <= 1 ) return ;
        if (price.trim().length <= 1 ) return ;
        if (isNaN(price.trim())) {
            alert ('Error el precio ingresado no es un numero')
            return ;
        }
        if (quantity.trim().length < 1 ) {
            alert ('Error la cantidad tiene que ser mayor a 0')
            return ;
        }
        if (isNaN(quantity.trim())) {
            alert ('Error la cantidad ingresada no es un numero')
            return ;
        }

        setItems ([...items, {
            id: counter,
            product: product.trim (), 
            price: +price.trim (), 
            quantity: +quantity.trim ()
        }]);
        setFormItemsStates ({
            product: '',
            price: '',
            quantity: '',
        })
        setCounter (counter + 1);
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
                    <ListItemsView title="Productos de la factura" items={items}/>
                    <TotalView total = { total } />
                    <form className="w=50" onSubmit ={ event => onInvoiceItemsSubmit (event)}>
                        <input 
                            type="text" 
                            name="product" 
                            value={product}
                            placeholder="Producto"
                            className="form-control m-3" 
                            onChange ={ event => onInputChange (event)}/>
                        <input 
                            type="text" 
                            name="price" 
                            value={price}
                            placeholder="Precio"
                            className="form-control m-3" 
                            onChange ={ event => onInputChange (event)} />
                        <input 
                            type="text" 
                            name="quantity" 
                            value={quantity}
                            placeholder="Cantidad"
                            className="form-control m-3" 
                            onChange ={ event => onInputChange (event)} />
                        <button 
                            type="submit" 
                            className="btn btn-primary m-3">
                            Nuevo Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
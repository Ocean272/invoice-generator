let itemCounter = 0;

function addInvoiceItem() {
    itemCounter++;

    const newItemRow = `
    <tr id="itemRow${itemCounter}">
        <td>
            <select>
                <option value="">
                        
                    </option>
                <option value="Installation / Dismantle">
                        Installation / Dismantle
                    </option>
                <option value="Troubleshooting">
                        Troubleshooting
                    </option>
                <optgroup label="Amplifier">
                    <option>
                        <p>Amplifier 2-channel (New)
                        <br>
                        1 year warranty</p>
                    </option>
                    <option>
                        <p>Amplifier 4-channel (New)
                        <br>
                        1 year warranty</p>
                    </option>
                    <option>
                        <p>Amplifier 2-channel (2nd hand)
                        <br>
                        No warranty</p>
                    </option>
                    <option>
                        <p>Amplifier 4-channel (2nd hand)
                        <br>
                        No warranty</p>
                    </option>
                </optgroup>
                <optgroup label="RCA Cable">
                    <option>
                        RCA Hi-Lo Adaptor
                    </option>
                    <option>
                        RCA 5 metres
                    </option>
                    <option>
                        RCA 3 metres
                    <option>
                        RCA 2 metres
                    </option>
                    <option>
                        RCA 1 metre
                    </option>
                    <option>
                        Speaker cable / Power cable / circuit breaker (1 lot)
                    </option>
                </optgroup>
                <optgroup label="Speakers">
                    <option>
                        Component Speakers                        
                    </option>
                    <option>
                        Coaxial Speakers
                    </option>
                </optgroup>
                <optgroup label="Subwoofer">
                    <option>
                        Active subwoofer                        
                    </option>
                    <option>
                        Passive subwoofer 10"
                    </option>
                    <option>
                        Passive subwoofer 12"
                    </option>
                </optgroup>
                <optgroup label="DSP">
                    <option>
                        DSP (GroudZero)                      
                    </option>
                    <option>
                        DSP (Machtig)                      
                    </option>
                    <option>
                        DSP (Others)                      
                    </option>
                </optgroup>
                <optgroup label="Headunit">
                    <option>
                        Headunit (Pioneer)                      
                    </option>
                    <option>
                        Headunit (Android)                      
                    </option>
                    <option>
                        Headunit (Others)                      
                    </option>
                    <option>
                        Headunit (2nd hand)                      
                    </option>
                </optgroup>
                <optgroup label="Dashcam Recorder / Reverse Camera">
                    <option>
                        Reverse Camera                      
                    </option>
                    <option>
                        Dashcam Recorder 2-channel (Deepfly)                     
                    </option>
                    <option>
                        Dashcam Recorder 2-channel (BlackVue)                     
                    </option>
                    <option>
                        Dashcam Recorder 2-channel (IRoad)                     
                    </option>
                    <option>
                        Dashcam Recorder 1-channel (Deepfly)                     
                    </option>
                    <option>
                        Dashcam Recorder 1-channel (BlackVue)                     
                    </option>
                    <option>
                        Dashcam Recorder 1-channel (IRoad)                     
                    </option>
                </optgroup>
                <optgroup label="Accessories">
                    <option>
                        Sound Proofing                    
                    </option>
                    <option>
                        LEDs                    
                    </option>
                    <option>
                        Miscellenous                    
                    </option>
                </optgroup>
            </select>
        </td>
        <td><input type="number" class="form-control quantity"
        placeholder="Enter Quantity" required></td>
        <td><input type="number" class="form-control unitPrice"
        placeholder="Enter Unit Price" required></td>
        <td><input type="text" class="form-control totalItemPrice"
        disabled readonly ></td>
        <td><button type="button" class="btn btn-danger" 
        onclick="removeInvoiceItem(${itemCounter})">Remove
        </button></td>
    `;


    $("#invoiceItems").append(newItemRow);

    // update total amount on every item added
    updateTotalAmount();
}

function removeInvoiceItem(itemId) {
    $(`#itemRow${itemId}`).remove();
    updateTotalAmount();
}

function updateTotalAmount(){
    let totalAmount = 0;

    $("tr[id^='itemRow']").each(function(){
        const quantity = parseFloat($(this).find(".quantity").val()) || 0;
        const unitPrice = parseFloat($(this).find(".unitPrice").val()) || 0;
        const totalItemPrice = quantity * unitPrice;

        $(this).find(".totalItemPrice").val(totalItemPrice.toFixed(2));
        totalAmount += totalItemPrice;
    });

    $("#totalAmount").val(totalAmount.toFixed(2))
}

//automatic set current date for invoice date
$(document).ready(function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    $("#invoiceDate").val(formattedDate);
});

$('#invoiceForm').submit(function (event){
    event.preventDefault();
    updateTotalAmount();
});

// print cash sales

function printInvoice(){
    const customerName = $("#customerName").val();
    const invoiceDate = $("#invoiceDate").val();
    const items = [];

    $("tr[id^='itemRow']").each(function(){
        const description = $(this).find("td:eq(0) select").val();
        const quantity = $(this).find("td:eq(1) input").val();
        const unitPrice = $(this).find("td:eq(2) input").val();
        const totalItemPrice = $(this).find("td:eq(3) input").val();
        

        items.push({
            description: description,
            quantity: quantity,
            unitPrice: unitPrice,
            totalItemPrice: totalItemPrice,
        });
    });

    const totalAmount = $("#totalAmount").val();

    const invoiceContent = `
            <html>
                <head>
                    <title>Cash Sale Slip</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                        }

                        h2 {
                            color: #007bff;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }

                        th, td {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }

                        .total {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <h2>Invoice Slip</h2>
                    <p><strong>Vehicle No: </strong>${customerName}</p>
                    <p><strong>Date and Time: </strong>${invoiceDate}</p>
                    <table>
                        <thread>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thread>
                        <tbody>
                            ${items.map((item) => ` 
                                <tr>
                                    <td>${item.description}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.unitPrice}</td>
                                    <td>${item.totalItemPrice}</td>
                                </tr>
                            `
                            ).join("")}
                        </tbody>
                    </table>
                    <p class="total">Total Amount = ${totalAmount}</p>
                </body>
            </html>
        `;
    
    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
}
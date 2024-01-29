<!DOCTYPE html>
<html>
<style type="text/css">
    body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    .m-0 {
        margin: 0px;
    }

    .p-0 {
        padding: 0px;
    }

    .pt-5 {
        padding-top: 5px;
    }

    .mt-10 {
        margin-top: 10px;
    }

    .text-center {
        text-align: center !important;
    }

    .w-100 {
        width: 100%;
    }

    .w-50 {
        width: 50%;
    }

    .w-85 {
        width: 85%;
    }

    .w-15 {
        width: 15%;
    }

    .logo img {
        width: 200px;
        height: 60px;
    }

    .gray-color {
        color: #5D5D5D;
    }

    .text-bold {
        font-weight: bold;
    }

    .border {
        border: 1px solid black;
    }

    table tr,
    th,
    td {
        border: 1px solid #d2d2d2;
        border-collapse: collapse;
        padding: 7px 8px;
    }

    table tr th {
        background: #F4F4F4;
        font-size: 15px;
    }

    table tr td {
        font-size: 13px;
    }

    table {
        border-collapse: collapse;
    }

    .box-text p {
        line-height: 10px;
    }

    .float-left {
        float: left;
    }

    .total-part {
        font-size: 16px;
        line-height: 12px;
    }

    .total-right p {
        padding-right: 20px;
    }
</style>

<body>
    <div class="head-title">
        <h1 class="text-center m-0 p-0">Invoice</h1>
    </div>
    <div class="add-detail mt-10">
        <div class="w-50 float-left mt-10">
            <p class="m-0 pt-5 text-bold w-100">Order Id - <span
                    class="gray-color">{{ $orderitems[0]->tracking_no }}</span></p>
            <p class="m-0 pt-5 text-bold w-100">Order Date - <span
                    class="gray-color">{{ $orderitems[0]->created_at }}</span></p>
        </div>
        <div class="w-50 float-left logo mt-10">

        </div>
        <div style="clear: both;"></div>
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10">
            <tr>
                <th class="w-50">From</th>
                <th class="w-50">To</th>
            </tr>
            <tr>
                <td>
                    <div class="box-text">
                        <p>E-knjizara,</p>
                        <p>Random adresa,</p>
                        <p>Belgrade</p>
                        <p>Contact: (650) 253-0000</p>
                    </div>
                </td>
                <td>


                    <div class="box-text">

                        <p>{{ $orderitems[count($orderitems) - 1]->firstname }}
                            {{ $orderitems[count($orderitems) - 1]->lastname }},</p>
                        <p>{{ $orderitems[count($orderitems) - 1]->address }},</p>
                        <p>{{ $orderitems[count($orderitems) - 1]->city }}</p>
                        <p>{{ $orderitems[count($orderitems) - 1]->phone }}</p>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10">
            <tr>
                <th class="w-50">Payment Method</th>
                <th class="w-50">Shipping Method</th>
            </tr>
            <tr>
                <td>Cash On Delivery</td>
                <td>Free Shipping - Free Shipping</td>
            </tr>




        </table>


        <div class="table-section bill-tbl w-100 mt-10">
            <table class="table w-70 mt-10" style="width:70%; float: left">
                <tr>
                    <th class="w-35">Book Name</th>
                    <th class="w-35">Book Price</th>


                </tr>

                @foreach ($books as $book)
                    @foreach ($book as $object)
                        <tr align="center">
                            <td>{{ $object->title }}</td>

                            <td>{{ $object->price }}</td>



                        </tr>
                    @endforeach
                @endforeach
            </table>
            <table class="table w-30 mt-10" style="width:30%; float:left">
                <tr>
                    <th class="w-30">Book Qty</th>
                </tr>
                @foreach ($items as $item)
                    <tr align="center">

                        <td>{{ $item['qty'] }}</td>
                    </tr>
                @endforeach

            </table>


            @php $i = 0; @endphp
            @foreach ($items as $it)
                @php      $i += $it['qty'] * $it['price'];      @endphp
            @endforeach
            <div class="add-detail mt-10" style="clear: both">

                <div class="total-part">
                    <div class="total-left w-85 float-left" align="right">
                        <p>Total price:</p>
                    </div>
                    <div class="total-right w-15 float-left text-bold" align="right">
                        <p>{{ $i }}</p>
                    </div>
                    <div style="clear: both;"></div>
                </div>

            </div>

        </div>
    </div>

</html>

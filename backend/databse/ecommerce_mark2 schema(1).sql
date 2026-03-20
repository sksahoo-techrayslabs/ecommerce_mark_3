create database ecommerce_mark2;
use ecommerce_mark2;


-- ----1---customer------------ 

create table customer (
customerid int primary key auto_increment,
firstname varchar(50) not null,
middlename varchar(50),
lastname varchar(50) not null,
email varchar(50) not null unique,
dob date not null,
phone varchar(13) not null unique,
age int
);

-- -----2-----seller------------

create table seller(
sellerid int primary key auto_increment not null,
name varchar(50) not null,
phone varchar(13) not null
);
-- ---3------ category-----------

create table category(
 categoryid int primary key auto_increment not null,
 categoryname varchar(50) not null,
 details varchar(500)
 );
 
 -- -4-----------product------------
 
create table product (
sellerid int not null,
categoryid int ,
productid int primary key auto_increment,
productname varchar(50) not null,
brand varchar(100),
price decimal(10,2) not null,
stock int not null,
foreign key (sellerid) references seller(sellerid) on delete cascade on update cascade,
foreign key(categoryid) references category(categoryid) on delete cascade on update cascade
);

 
-- -----5--------cart--------------

create table cart(
customerid int,
productid int,
cartid int primary key auto_increment ,
quantity int,
totalitem int ,
totalprice decimal(10,2),
foreign key (customerid) references customer(customerid) on delete cascade on update cascade,
foreign key (productid) references product(productid) on delete cascade on update cascade
);


-- -----6----------orderitem---------------
create table orderitem(
orderitemid int primary key auto_increment,
-- orderid int,
productid int not null,
price decimal(10,2)  not null, 
quantity int ,
-- foreign key (orderid) references orders(orderid) on delete cascade on update cascade,
foreign key (productid) references product(productid) on delete cascade on update cascade
);


-- -------7--------orders--------------------------

create table orders(
orderid int primary key auto_increment ,
cartid int,
customerid int,
orderitemid int,
ordernumber varchar(100),
orderdate datetime  default current_timestamp,
shippingdate datetime  default current_timestamp,
orderprice decimal(10,2),
orderstatus  enum ('pending', 'completed', 'rejected') default 'pending',
foreign key(cartid) references cart(cartid) on delete cascade on update cascade,
foreign key(customerid) references customer(customerid) on delete cascade on update cascade,
foreign key(orderitemid) references orderitem(orderitemid) on delete cascade on update cascade
);

-- --8-------payment----------

create table payment(
orderid int,
customerid int,
paymentid int primary key  auto_increment,
paymentmode varchar(50),
dateofpayment datetime default current_timestamp ,
foreign key (orderid) references orders(orderid) on delete cascade on update cascade, 
foreign key (customerid) references customer(customerid) on delete cascade on update cascade
);

-- -----9----------address-------------

create table address(
addressid int primary key auto_increment,
customerid int,
streetname varchar(50),
city varchar(50) not null,
state varchar(50) not null,
pincode varchar(15) not null,
foreign key(customerid) references customer(customerid) on delete cascade on update cascade
);

-- -----10-------refund--------------- 

create table refund( 
refundid int primary key auto_increment,
orderid int not null,
productid int not null,
customerid int not null,
quantity int not null,
refundamount decimal(10,2) not null,
refundreason varchar(100),
refundstatus enum ('pending', 'completed', 'rejected') default 'pending',
requestdate datetime default current_timestamp,
processeddate datetime default current_timestamp,
foreign key (orderid) references orders(orderid) on delete cascade on update cascade,
foreign key (productid) references product(productid) on delete cascade on update cascade,
foreign key (customerid) references customer(customerid) on delete cascade on update cascade
);

-- ---11---------review----------

create table review(
reviewid int primary key auto_increment,
customerid int,
productid int,
reviewdetails varchar(100),
rating int check (rating between 1 and 5) ,
foreign key (customerid) references customer(customerid) on delete cascade on update cascade,
foreign key (productid) references product(productid) on delete cascade on update cascade
);

/* =========================================================
   BUS TICKET BOOKING SYSTEM - FULL DATABASE SCRIPT
   DB: SQL Server
   ========================================================= */

-- =========================
-- 1. DROP & CREATE DATABASE
-- =========================
IF DB_ID('BusTicketBooking') IS NOT NULL
BEGIN
    ALTER DATABASE BusTicketBooking SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE BusTicketBooking;
END;
GO

CREATE DATABASE BusTicketBooking;
GO
USE BusTicketBooking;
GO

-- =========================
-- 2. MASTER TABLES
-- =========================

-- Roles
CREATE TABLE Roles (
    RoleID INT IDENTITY PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Roles (RoleName)
VALUES ('Admin'), ('Customer');

-- Users
CREATE TABLE Users (
    UserID INT IDENTITY PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    PasswordHash NVARCHAR(255) NOT NULL,
    RoleID INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

INSERT INTO Users (FullName, Email, Phone, PasswordHash, RoleID)
VALUES
(N'Nguyễn Văn A', 'a@gmail.com', '090000001', 'hash_a', 2),
(N'Trần Thị B', 'b@gmail.com', '090000002', 'hash_b', 2),
(N'Admin System', 'admin@gmail.com', '099999999', 'admin_hash', 1);

-- Bus Companies
CREATE TABLE BusCompanies (
    CompanyID INT IDENTITY PRIMARY KEY,
    CompanyName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    Description NVARCHAR(255)
);

INSERT INTO BusCompanies (CompanyName, Phone, Description)
VALUES
(N'Phương Trang', '19006067', N'Xe giường nằm cao cấp'),
(N'Thành Bưởi', '19006079', N'Xe limousine');

-- Locations
CREATE TABLE Locations (
    LocationID INT IDENTITY PRIMARY KEY,
    LocationName NVARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO Locations (LocationName)
VALUES
(N'Hà Nội'),
(N'Đà Nẵng'),
(N'Hồ Chí Minh'),
(N'Cần Thơ');

-- Routes
CREATE TABLE Routes (
    RouteID INT IDENTITY PRIMARY KEY,
    FromLocationID INT NOT NULL,
    ToLocationID INT NOT NULL,
    DistanceKm INT,
    CONSTRAINT FK_Routes_From FOREIGN KEY (FromLocationID) REFERENCES Locations(LocationID),
    CONSTRAINT FK_Routes_To FOREIGN KEY (ToLocationID) REFERENCES Locations(LocationID)
);

INSERT INTO Routes (FromLocationID, ToLocationID, DistanceKm)
VALUES
(1, 3, 1700),
(3, 4, 170),
(1, 2, 800);

-- =========================
-- 3. BUS & SEAT
-- =========================

-- Buses
CREATE TABLE Buses (
    BusID INT IDENTITY PRIMARY KEY,
    CompanyID INT NOT NULL,
    LicensePlate NVARCHAR(20) NOT NULL UNIQUE,
    TotalSeats INT NOT NULL,
    CONSTRAINT FK_Buses_Company FOREIGN KEY (CompanyID) REFERENCES BusCompanies(CompanyID)
);

INSERT INTO Buses (CompanyID, LicensePlate, TotalSeats)
VALUES
(1, '51A-12345', 40),
(2, '51B-67890', 32);

-- Seats
CREATE TABLE Seats (
    SeatID INT IDENTITY PRIMARY KEY,
    BusID INT NOT NULL,
    SeatNumber NVARCHAR(10) NOT NULL,
    CONSTRAINT FK_Seats_Bus FOREIGN KEY (BusID) REFERENCES Buses(BusID),
    CONSTRAINT UQ_Seat UNIQUE (BusID, SeatNumber)
);

-- Generate seats for BusID = 1 (40 seats)
DECLARE @i INT = 1;
WHILE @i <= 40
BEGIN
    INSERT INTO Seats (BusID, SeatNumber)
    VALUES (1, CONCAT('A', @i));
    SET @i += 1;
END;

-- Generate seats for BusID = 2 (32 seats)
SET @i = 1;
WHILE @i <= 32
BEGIN
    INSERT INTO Seats (BusID, SeatNumber)
    VALUES (2, CONCAT('B', @i));
    SET @i += 1;
END;

-- =========================
-- 4. TRIPS & BOOKING
-- =========================

-- Trips
CREATE TABLE Trips (
    TripID INT IDENTITY PRIMARY KEY,
    RouteID INT NOT NULL,
    BusID INT NOT NULL,
    DepartureTime DATETIME NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Trips_Route FOREIGN KEY (RouteID) REFERENCES Routes(RouteID),
    CONSTRAINT FK_Trips_Bus FOREIGN KEY (BusID) REFERENCES Buses(BusID)
);

INSERT INTO Trips (RouteID, BusID, DepartureTime, Price)
VALUES
(1, 1, '2026-02-01 08:00:00', 750000),
(2, 2, '2026-02-01 09:00:00', 150000);

-- Bookings
CREATE TABLE Bookings (
    BookingID INT IDENTITY PRIMARY KEY,
    UserID INT NOT NULL,
    TripID INT NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'PENDING',
    CONSTRAINT FK_Bookings_User FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_Bookings_Trip FOREIGN KEY (TripID) REFERENCES Trips(TripID)
);

INSERT INTO Bookings (UserID, TripID, Status)
VALUES
(1, 1, 'CONFIRMED');

-- Booking Details
CREATE TABLE BookingDetails (
    BookingDetailID INT IDENTITY PRIMARY KEY,
    BookingID INT NOT NULL,
    SeatID INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_BookingDetails_Booking FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID),
    CONSTRAINT FK_BookingDetails_Seat FOREIGN KEY (SeatID) REFERENCES Seats(SeatID),
    CONSTRAINT UQ_Booking_Seat UNIQUE (BookingID, SeatID)
);

INSERT INTO BookingDetails (BookingID, SeatID, Price)
VALUES
(1, 1, 750000);

-- =========================
-- 5. PAYMENT
-- =========================

CREATE TABLE Payments (
    PaymentID INT IDENTITY PRIMARY KEY,
    BookingID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentMethod NVARCHAR(50),
    PaymentStatus NVARCHAR(50),
    PaymentDate DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Payments_Booking FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);

INSERT INTO Payments (BookingID, Amount, PaymentMethod, PaymentStatus)
VALUES
(1, 750000, 'MOMO', 'SUCCESS');

-- =========================
-- 6. INDEXES (PERFORMANCE)
-- =========================

CREATE INDEX IDX_Trips_RouteID ON Trips(RouteID);
CREATE INDEX IDX_Trips_DepartureTime ON Trips(DepartureTime);
CREATE INDEX IDX_Bookings_UserID ON Bookings(UserID);
CREATE INDEX IDX_BookingDetails_BookingID ON BookingDetails(BookingID);

-- =========================
-- DONE
-- =========================
PRINT 'BusTicketBooking database created successfully!';

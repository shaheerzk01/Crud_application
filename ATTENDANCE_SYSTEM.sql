CREATE DATABASE ATTENDENCE_SYSTEM

CREATE TABLE COURSE(
    [COURSE ID] INT NOT NULL PRIMARY KEY,
    [COURSE CODE] VARCHAR(50),
    [COURSE NAME] VARCHAR(50),
    [SHORT NAME] VARCHAR(50) 
)

CREATE TABLE SLOT(
    [SLOT ID] INT NOT NULL PRIMARY KEY,
    [FROM] VARCHAR,
    [TO] VARCHAR
)

CREATE TABLE TEACHER(
    [TEACHER ID] INT NOT NULL PRIMARY KEY,
    [TEACHER NAME] VARCHAR(50),
    CONTACT VARCHAR(50),
    EMAIL VARCHAR
)

CREATE TABLE ROOM(
    [ROOM ID] INT NOT NULL PRIMARY KEY,
    CAPACITY INT,
    [ROOM NO] VARCHAR(50)
)

CREATE TABLE STUDENT(
    [STUDENT ID] INT NOT NULL PRIMARY KEY,
    [STUDENT NAME] VARCHAR(50),
    CONTACT VARCHAR(50),
    EMAIL VARCHAR(50)
)

CREATE TABLE [TIME SLOT](
    [TIME SLOT ID] INT NOT NULL PRIMARY KEY,
    [DAY] VARCHAR(50),
    [SLOT ID] INT FOREIGN KEY REFERENCES SLOT([SLOT ID]),
    [ROOM ID] INT FOREIGN KEY REFERENCES ROOM([ROOM ID])
)

CREATE TABLE [COURSE OFFERED](
    [COURSE OFFERED ID] INT NOT NULL PRIMARY KEY,
    [COURSE ID] INT FOREIGN KEY REFERENCES COURSE([COURSE ID]),
    [TIME SLOT ID] INT FOREIGN KEY REFERENCES [TIME SLOT]([TIME SLOT ID])
)

CREATE TABLE [TEACHER ALLOCATION](
    [TEACHER ALLOCATION ID] INT NOT NULL PRIMARY KEY,
    [COURSE OFFERED ID] INT FOREIGN KEY REFERENCES [COURSE OFFERED]([COURSE OFFERED ID]),
    [TEACHER ID] INT FOREIGN KEY REFERENCES TEACHER([TEACHER ID])
)

CREATE TABLE [STUDENT ENROLLNMENT](
    [STUDENT ENROLLNMENT ID] INT NOT NULL PRIMARY KEY,
    [STUDENT ID] INT FOREIGN KEY REFERENCES STUDENT([STUDENT ID]),
    [COURSE OFFERED ID] INT FOREIGN KEY REFERENCES [COURSE OFFERED]([COURSE OFFERED ID])
)

CREATE TABLE [ATTENDANCE MASTER](
    [ATTENDANCE MASTER ID] INT NOT NULL PRIMARY KEY,
    [COURSE OFFERED ID] INT FOREIGN KEY REFERENCES [COURSE OFFERED]([COURSE OFFERED ID]),
    [DATE] DATE
)

CREATE TABLE [ATTENDANCE DETAILS](
    [ATTENDANCE DETAILS ID] INT NOT NULL PRIMARY KEY,
    [STUDENT ID] INT FOREIGN KEY REFERENCES STUDENT([STUDENT ID]),
    [ATTENDANCE MASTER ID] INT FOREIGN KEY REFERENCES [ATTENDANCE MASTER]([ATTENDANCE MASTER ID]),
    [STATUS] VARCHAR(50) CHECK([STATUS] IN ('PRESENT','ABSENT','LEAVE'))
)

INSERT INTO STUDENT ([STUDENT ID], [STUDENT NAME], CONTACT, EMAIL, [STUDENT REGISTRATION NUMBER], STATUS)
VALUES
    (1, 'John Doe', '1234567890', 'john.doe@example.com', 'A12345', 'Active'),
    (2, 'Jane Smith', '9876543210', 'jane.smith@example.com', 'B98765', 'Active'),
    (3, 'Michael Johnson', '5551234567', 'michael.johnson@example.com', 'C54321', 'Inactive'),
    (4, 'Emily Brown', '9998887777', 'emily.brown@example.com', 'D98765', 'Active'),
    (5, 'David Wilson', '4445556666', 'david.wilson@example.com', 'E12345', 'Inactive');

select * from STUDENT
select * from TEACHER
ALTER TABLE STUDENT
select  * from room
select * from [time slot]
ADD [STATUS] VARCHAR(50);

DELETE FROM STUDENT

CREATE PROCEDURE Student_GetAll
@ParamTable1 int
AS
BEGIN
    SELECT * FROM STUDENT 
    WHERE studentid = @ParamTable1
END

DROP PROCEDURE if EXISTS student_GetAll

sp_rename 'STUDENT.[STATUS]', 'Status', 'COLUMN';
sp_rename 'ROOM.[ROOM NO]', 'room_no', 'COLUMN';

select * from ROOM

Create type Student AS TABLE
(
    studentid int,
    studentregno varchar(10),
    studentname varchar(100),
    CONTACT varchar(50),
    EMAIL VARCHAR(100),
    Status VARCHAR(50)
)

create procedure Student_Save
@ParamTable1 Student READONLY
AS
BEGIN
    insert into STUDENT
    select p.studentid, p.studentregno, p.studentname, p.CONTACT, p.EMAIL, 1 from @ParamTable1 p
END

create procedure delete_student
@ParamTable1 INT
AS
BEGIN
    DELETE from STUDENT
    where studentid=@ParamTable1
END 

CREATE PROCEDURE insert_student
    @studentid INT,
    @studentname VARCHAR(50),
    @CONTACT VARCHAR(50),
    @EMAIL VARCHAR(50),
    @studentregno VARCHAR(50),
    @Status VARCHAR(50)
AS
BEGIN
    INSERT INTO STUDENT (studentid, studentname, CONTACT, EMAIL, studentregno, [Status])
    VALUES (@studentid, @studentname, @CONTACT, @EMAIL, @studentregno, @Status);
END

CREATE PROCEDURE UpdateStudent
    @studentid INT,
    @studentname VARCHAR(50),
    @studentregno VARCHAR(50),
    @CONTACT varchar(50),
    @EMAIL varchar(50)
AS
BEGIN
    UPDATE student
    SET studentname = @studentname,
        studentregno = @studentregno,
        CONTACT = @CONTACT,
        EMAIL = @EMAIL
    WHERE StudentID = @StudentID;
END

INSERT INTO COURSE (COURSE_ID, COURSE_NAME, COURSE_CODE, SHORT_NAME)
VALUES 
  (1, 'OPERATING SYSTEM', 'C1', 'CS1'),
  (2, 'INTRO TO SQL', 'C2', 'CS2'),
  (3, 'WEB ENGINEERING', 'C3', 'CS3'),
  (4, 'DATA STRUCTURES', 'C4', 'CS4'),
  (5, 'HCI', 'C5', 'CS5');

SELECT * FROM COURSE

CREATE PROCEDURE Course_GetAll
@ParamTable1 int
AS
BEGIN
    SELECT * FROM COURSE 
    WHERE COURSE_ID = @ParamTable1
END

CREATE PROCEDURE insert_course
    @COURSE_ID INT,
    @COURSE_NAME VARCHAR(50),
    @COURSE_CODE VARCHAR(50),
    @SHORT_NAME VARCHAR(50)
AS
BEGIN
    INSERT INTO COURSE (COURSE_ID, COURSE_NAME, COURSE_CODE, SHORT_NAME)
    VALUES (@COURSE_ID, @COURSE_NAME, @COURSE_CODE, @SHORT_NAME);
END

CREATE PROCEDURE UpdateCourse
    @COURSE_ID INT,
    @COURSE_NAME VARCHAR(50),
    @COURSE_CODE VARCHAR(50),
    @SHORT_NAME varchar(50)
AS
BEGIN
    UPDATE COURSE
    SET COURSE_NAME = @COURSE_NAME,
        COURSE_CODE = @COURSE_CODE,
        SHORT_NAME = @SHORT_NAME
    WHERE COURSE_ID = @COURSE_ID;
END

create procedure delete_course
@ParamTable1 INT
AS
BEGIN
    DELETE from COURSE
    where COURSE_ID=@ParamTable1
END 


insert into ROOM(room_id, capacity, room_no)
values
    (1, 50, 'R404'),
    (2, 60, 'R505')

select * from ROOM

create procedure get_room
@paramtable1 int
AS
BEGIN
    select * from room where room_id = @paramtable1
end

create procedure insert_room
@room_id INT,
@capacity INT,
@room_no VARCHAR(50)
AS
BEGIN
    insert into room(room_id, capacity, room_no)
    VALUES(@room_id, @capacity, @room_no)
end

create procedure update_room
@room_id INT,
@capacity INT,
@room_no VARCHAR(50)
AS
BEGIN
    update ROOM
    set capacity = @capacity,
        room_no = @room_no
    where room_id = @room_id
end

create procedure delete_room
@paramtable INT
AS
BEGIN
    delete from ROOM
    where room_id = @paramtable
end

select * from room
select * from course






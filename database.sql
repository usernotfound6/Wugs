-- Create the 'user' table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(1000),
  admin BOOLEAN DEFAULT false
);

-- Create the 'status' table
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  status_name VARCHAR (50)
);

-- Create the 'client' table
CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(100),
  address VARCHAR(100),
  website VARCHAR(255),
  manager_id INTEGER REFERENCES "user"(id),
  phone VARCHAR(20),
  hours_of_operation VARCHAR(200),
  micromarket_location VARCHAR(255),
  neighborhood_info VARCHAR(300),
  demographics VARCHAR(300),
  number_of_people VARCHAR(40),
  target_age_group VARCHAR(200),
  industry VARCHAR(255),
  pictures VARCHAR(200)[],
  dimensions VARCHAR(100),
  wugs_visit BOOLEAN default false,
  contract VARCHAR(200),
  admin_notes VARCHAR(500),
  status_id INTEGER REFERENCES status(id) default 1
);

-- Create the 'service' table
CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR (20)
);

-- Create the 'product' table
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50)
);

-- Create a separate table for service and product relationships
-- junction table for client's services
CREATE TABLE client_service (
  client_id INTEGER REFERENCES client(id),
  service_id INTEGER REFERENCES service(id),
  PRIMARY KEY (client_id, service_id)
);

-- junction table for client's products
CREATE TABLE client_product (
  client_id INTEGER REFERENCES client(id),
  product_id INTEGER REFERENCES product(id),
  PRIMARY KEY (client_id, product_id)
);

-- Create the 'interested' table
CREATE TABLE interested (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  industry VARCHAR(100),
  about_you VARCHAR(300),
  why_wugs VARCHAR(300)
);

-- Remove the existing foreign key constraint named "client_product_client_id_fkey"
ALTER TABLE client_product
DROP CONSTRAINT client_product_client_id_fkey;

-- Add a new foreign key constraint to the "client_product" table
-- The new constraint ensures that the "client_id" in "client_product" references the "id" in "client"
-- ON DELETE CASCADE specifies that when a record in "client" is deleted, all related records in "client_product" will also be deleted
ALTER TABLE client_product
ADD CONSTRAINT client_product_client_id_fkey
FOREIGN KEY (client_id) REFERENCES client(id)
ON DELETE CASCADE;

INSERT INTO "user" (first_name, last_name, username, password, admin)
VALUES
('John', 'Doe', 'john.doe@email.com', 'hashed_password_here', false),
('Jane', 'Smith', 'jane.smith@email.com', 'hashed_password_here', false),
('Bob', 'Johnson', 'bob.johnson@email.com', 'hashed_password_here', false);


INSERT INTO service (service_name) 
VALUES 
('Micro Markets'), ('Smart Coolers'), ('Snack Boxes');

INSERT INTO status (status_name) 
VALUES
  ('Onboarding Incomplete'),
  ('Pending Wugs Approval'),
  ('Render In Progress'),
  ('Contract Sent Awaiting Completion'),
  ('Pending Contract Approval'),
  ('Account Active'),
  ('Account Inactive');
  
  INSERT INTO product (type) 
  VALUES
  ('African'),
  ('Asian'),
  ('Gluten Free'),
  ('Mexican'),
  ('Perishable'),
  ('Frozen'),
  ('Kosher'),
  ('Halal'),
  ('Dairy Free');

INSERT INTO client (
  business_name,
  address,
  website,
  manager_id,
  phone,
  hours_of_operation,
  micromarket_location,
  neighborhood_info,
  demographics,
  number_of_people,
  target_age_group,
  industry,
  pictures,
  dimensions,
  wugs_visit,
  contract,
  admin_notes,
  status_id
) VALUES
('ABC School', '123 Elm Street', 'www.abcschool.com', 1, '555-123-4567', 'Mon-Fri: 8 AM - 5 PM', 'Cafeteria', 'Nearby grocery store and pharmacy', 'Mixed demographics', 500, 'Students and Staff', 'Education', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '15 ft x 5 ft', true, 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about school client', 1),
('XYZ Nursing Home', '456 Oak Avenue', 'www.xyznursinghome.com', 2, '555-987-6543', '24/7', 'Common Area', 'Close to a convenience store', 'Elderly residents', 100, 'Seniors', 'Healthcare', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '65 inches by 32 inches', false, 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about nursing home client', 2),
('123 College', '789 Maple Road', 'www.123college.edu', 3, '555-567-8901', 'Mon-Sat: 7 AM - 10 PM', 'Student Center', 'Adjacent to a campus store', 'College students', 2000, 'Young Adults', 'Education', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg'], '10ft high, 22 ft width, 4 ft out from wall', true, 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about college client', 1);

INSERT INTO interested (name, email, phone_number, industry, about_you, why_wugs) VALUES
    ('John Doe', 'john.doe@example.com', '555-555-5555', 'Technology', 'We are a tech startup focused on AI and machine learning.', 'We would like a vending machine to provide convenient snacks and beverages for our employees.'),
    ('Jane Smith', 'jane.smith@example.com', '555-555-5555', 'Healthcare', 'We operate a healthcare clinic specializing in pediatrics.', 'Having a market on-site would be a great convenience for our patients and staff.'),
    ('Michael Johnson', 'michael.johnson@example.com', '555-555-5555', 'Education', 'We are a university library serving students and faculty.', 'A vending machine with study snacks and supplies would be valuable for our users.'),
    ('Sarah Williams', 'sarah.williams@example.com', '555-555-5555', 'Finance', 'We are a financial services firm providing investment advice.', 'Offering snacks and beverages to our clients during meetings would enhance their experience.'),
    ('David Lee', 'david.lee@example.com', '555-555-5555', 'Hospitality', 'We manage a hotel with a restaurant and conference facilities.', 'A vending machine would complement our dining options and cater to late-night cravings for guests.'),
    ('Karen Brown', 'karen.brown@example.com', '555-555-5555', 'Manufacturing', 'We run a manufacturing plant for automotive components.', 'Our employees work long hours, and a vending machine would provide quick access to refreshments.'),
    ('Lisa Taylor', 'lisa.taylor@example.com', '555-555-5555', 'Retail', 'We own a retail store selling electronics and gadgets.', 'Offering snacks and drinks while customers browse our products would boost sales and customer satisfaction.');
    
-- Dummy data for junction tables
INSERT INTO client_service (client_id, service_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 3);

INSERT INTO client_product (client_id, product_id)
VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 4);
import React, { useEffect, useState } from "react";
import { BsArrowDownUp, BsFillFunnelFill } from "react-icons/bs";
import { EndPoints } from "../apis/constants";
import { instance } from "../apis/request";
import Page from "../components/Page";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [gender, setGender] = useState("all");
  const [country, setCountry] = useState("all");
  const [useFilter, setUseFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //for getting the data from api
  const getData = () => {
    instance
      .get(EndPoints.User)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log("The err is : ", err);
      });
  };

  //genter type declaration
  const genderType = (str) => {
    if (str === "male") {
      return "M";
    } else if (str === "female") {
      return "F";
    } else {
      return " "; // if any another type were declared declare
    }
  };

  //tablehead data
  const tableData = [
    "ID",
    "Image",
    "Full Name",
    "Demography",
    "Designation",
    "Location",
  ];

  //getting icon for id,name and age
  const tableDataFunction = (str) => {
    if (str === "ID" || str === "Full Name" || str === "Demography") {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => {
            !useFilter && handleSort(str);
            console.log("hello");
          }}
        >
          {str}
          <BsArrowDownUp className="text-xs cursor-pointer" />
        </div>
      );
    } else {
      return str;
    }
  };

  //gender filtering
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (gender === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.gender === gender));
    }
  }, [gender, users]);

  //Country Filtering
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    if (country === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) => user.address.country === country)
      );
    }
  }, [country, users]);

  //enable and disable filter icons
  const handleFilter = () => {
    setUseFilter(!useFilter);
    setCountry("all");
    setGender("all");
  };

  //sorting of id, name and age
  const handleSort = (str) => {
    //sorting for id
    if (str === "ID") {
      const sortedData = [...users].sort((a, b) => {
        return sortOrder === true && b.id - a.id;
      });
      setFilteredUsers(sortedData);
      setSortOrder(!sortOrder);
    }
    //sorting for name
    else if (str === "Full Name") {
      const sortedData = [...users].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return sortOrder && -1;
        }
      });
      setFilteredUsers(sortedData);
      setSortOrder(!sortOrder);
    }
    //sorting for age
    else if (str === "Demography") {
      const sortedData = [...users].sort((a, b) => {
        return sortOrder && a.age - b.age;
      });
      setFilteredUsers(sortedData);
      setSortOrder(!sortOrder);
    }
  };

  // infinite event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        setUsers((prev) => [...prev, ...users]);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, [users]);

  return (
    <Page>
      <div className="flex flex-row justify-between mt-10 mb-4 mx-5 ">
        <h1 className="text-black font-bold md:text-2xl">Employees</h1>
        <div className="flex md:flex-row flex-col gap-2 items-center">
          <BsFillFunnelFill
            className={`${
              useFilter ? "text-black" : "text-[#a3372f]"
            } mx-3 cursor-pointer`}
            onClick={handleFilter}
          />
          <div className="flex flex-row items-center justify-between border-gray-200 border-2 w-28 px-2 rounded cursor-pointer">
            <select
              className="w-full cursor-pointer"
              onChange={handleChangeCountry}
              disabled={useFilter}
            >
              <option value="all">Country</option>
              <option value="United States">USA</option>
              <option value="india">India</option>
              <option value="canada">Canada</option>
            </select>
          </div>
          <div className="flex flex-row items-center justify-between border-gray-200 border-2 w-28 px-2 rounded cursor-pointer">
            <select
              value={gender}
              onChange={handleChangeGender}
              className={`w-full cursor-pointer`}
              disabled={useFilter}
            >
              <option value="all">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <div className=" mx-5  border-2 border-gray-200 rounded-xl overflow-auto">
        <table class="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead>
            <tr>
              {tableData.map((singleData, index) => (
                <th
                  key={index}
                  class="px-6 py-3 text-left text-sm font-medium tracking-wider"
                >
                  {tableDataFunction(singleData)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={tableData.length}
                  class="px-6 py-4 text-center text-gray-500"
                >
                  No Data yet...
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.image}
                      alt={`image${index}`}
                      className={`h-9 rounded-full ${
                        user.gender === "male" ? "bg-blue-200" : "bg-green-200"
                      }`}
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`${user.firstName} ${user.maidenName} ${user.lastName}`}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`${genderType(user.gender)}/${user.age}`}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.company.title}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`${user.address.state}, ${user.address.country}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default AllUsers;

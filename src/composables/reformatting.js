export default function formatStudent(unformattedStudent, familyNameList) {
  const student = {};

  student.firstName = getFirstName(unformattedStudent);
  student.middleName = getMiddleName(unformattedStudent);
  student.nickName = getNickName(unformattedStudent);
  student.lastName = getLastName(unformattedStudent);
  student.gender = getGender(unformattedStudent);
  student.house = getHouse(unformattedStudent);
  student.photo = getPhoto(unformattedStudent);
  student.bloodStatus = getBloodStatus(unformattedStudent, familyNameList);
  student.captain = getCaptaincy(student.firstName);
  student.prefect = false;
  student.inquisitor = false;
  student.expelled = false;

  return student;
}

function getFirstName(unformattedStudent) {
  return capitalise(unformattedStudent.fullname).split(" ")[0];
}

function getMiddleName(unformattedStudent) {
  let fullName = capitalise(unformattedStudent.fullname).split(" ");
  let middleName = fullName.join(" ");

  if (fullName.length > 2 && middleName.includes('"') === false) {
    middleName = middleName.substring(middleName.indexOf(" ") + 1, middleName.lastIndexOf(" "));
  } else {
    middleName = undefined;
  }

  return middleName;
}

function getNickName(unformattedStudent) {
  let fullName = capitalise(unformattedStudent.fullname).split(" ");
  let nickName = fullName.join(" ");

  if (fullName.length > 2 && nickName.includes('"') === true) {
    nickName = nickName.substring(nickName.indexOf(" ") + 1, nickName.lastIndexOf(" "));
  } else {
    nickName = undefined;
  }

  return nickName;
}

function getLastName(unformattedStudent) {
  let fullName = capitalise(unformattedStudent.fullname).split(" ");
  let lastName;

  if (fullName.length > 1) {
    lastName = fullName[fullName.length - 1];
  } else {
    lastName = undefined;
  }

  return lastName;
}

function getGender(unformattedStudent) {
  return capitalise(unformattedStudent.gender);
}

function getHouse(unformattedStudent) {
  return capitalise(unformattedStudent.house);
}

function getPhoto(unformattedStudent) {
  //Extract fullName
  let fullName = unformattedStudent.fullname.trim().toLowerCase();

  //Extract lastName from fullName
  let lastName = fullName.substring(fullName.lastIndexOf(" ") + 1);

  //Handle hyphenated lastName scenarios
  if (lastName.includes("-")) {
    lastName = lastName.substring(lastName.lastIndexOf("-") + 1);
  }

  //Extract firstName from fullName
  let firstName = fullName.substring(0, fullName.indexOf(" "));

  //Handle duplicate lastName scenarios
  let lastNameCount = 0;

  // lastNameList.forEach((studentLastName) => {
  //   if (lastName === studentLastName) lastNameCount++;
  // });

  if (lastNameCount > 1) {
    firstName = firstName;
  } else {
    firstName = firstName[0];
  }

  let photoSrc = `${lastName}_${firstName}.png`;

  return photoSrc;
}

function getBloodStatus(unformattedStudent, familyNameList) {
  //Get student last name
  const lastName = getLastName(unformattedStudent);
  let bloodStatus;

  //Check pure blood names first
  familyNameList.pure.forEach((familyName) => {
    if (lastName === familyName) {
      bloodStatus = `Pure-blood`;
    }
  });

  //Check half blood names last to overwrite pure-blood
  familyNameList.half.forEach((familyName) => {
    if (lastName === familyName) {
      bloodStatus = `Half-blood`;
    }
  });

  if (bloodStatus === undefined) {
    bloodStatus = `Muggle-born`;
  }

  return bloodStatus;
}

function getCaptaincy(name) {
  if (name === "Harry" || name === "Zacharias" || name === "Pansy" || name === "Anthony") {
    return true;
  } else {
    return false;
  }
}

function getLastNameList(students) {
  students.forEach((student) => {
    let lastName = student.fullname.trim().toLowerCase();
    lastName = handleLastName(lastName);

    if (lastName.includes("-")) {
      lastName = handleHyphenedLastName(lastName);
    }

    lastNameList.push(lastName);
  });
}

function capitalise(textToCapitalise) {
  //Make everything lower case
  textToCapitalise = textToCapitalise.toLowerCase().trim();

  //Array of filters to capitalise following letters
  const filters = [" ", "-", '"'];

  //Loop through each filter
  filters.forEach((filter) => {
    textToCapitalise = textToCapitalise
      .split(`${filter}`)
      .map((filteredString) => {
        return filteredString[0].toUpperCase() + filteredString.substring(1);
      })
      .join(`${filter}`);
  });

  return textToCapitalise;
}

import React from "react";
import TableAttributeType from "../enums/TableAttributeType";

/**
 * Parent class for table attributes, typically never used directly
 */
export default class TableAttribute {
  attributeName: string;
  attributeType: TableAttributeType;
  stringTypeAttributeLengthInfo?: number;
  enumOptions?: Array<string>;
  decimalNumDigits?: number;
  decimalNumDecimalDigits?: number;

  /**
   * Constructor
   * @param attributeName Name of attirbute
   * @param attributeType Attribute type, should be one of the enums under TableAttributeType
   * @param stringTypeAttributeLengthInfo Valid when the type is either a char or varchar undefined
   * @param enumOptions Valid when type is of enum, should be Array<string> undefined
   * @param decimalNumDigits Valid when type is decimal otherwise undefined
   * @param decimalNumDecimalDigits Valid when type is decimal otherwise undefined
   */
  constructor(
    attributeName: string,
    attributeType: TableAttributeType,
    stringTypeAttributeLengthInfo?: number,
    enumOptions?: Array<string>,
    decimalNumDigits?: number,
    decimalNumDecimalDigits?: number
    ) {
    this.attributeName = attributeName;
    this.attributeType = attributeType;
    this.stringTypeAttributeLengthInfo = stringTypeAttributeLengthInfo;
    this.enumOptions = enumOptions;
    this.decimalNumDigits = decimalNumDigits;
    this.decimalNumDecimalDigits = decimalNumDecimalDigits
  }

  /**
   * Function to covert epoch time string back to datajoint time format
   * @param timeString 
   */
  static parseTimeString(timeString: string) {
    // Handle case with null
    if (timeString === null) {
      return '=NULL=';
    }

    const timeNumber = parseInt(timeString)
    let date = new Date(timeNumber * 1000);
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
    return Math.floor(timeNumber / 86400) * 24 + date.getUTCHours() + ":" + zeroPad(date.getUTCMinutes(), 2) + ":" + zeroPad(date.getUTCSeconds(), 2);
  }

  /**
   * Helper function for converting dateTime string back to string format for table view
   * @param dateTimeString 
   */
  static parseDateTime(dateTimeString: string) {
    // Handle case with null
    if (dateTimeString === null) {
      return '=NULL=';
    }

    let date = new Date(parseInt(dateTimeString) * 1000);
    return date.toUTCString();
  }

  /**
   * Helper function for converting date to Date String
   * @param dateString 
   */
  static parseDate(dateString: string) {
    // Handle case with null
    if (dateString === null) {
      return '=NULL=';
    }

    let date = new Date(parseInt(dateString) * 1000);
    return (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "-" + date.getUTCFullYear();
  }

  /**
   * Helper function for converting view purpose dateTime string back to datajoint dateTime YYYY-MM-DD HH:MM:SS
   * @param UTCdateTimeString date time string in UTC format
   * @returns Date time in datajoint format of YYYY-MM-DD HH:MM:SS
   */
  static parseDateTimeToDJFormat(UTCdateTimeString: string): string {
    let djDateTime = new Date(UTCdateTimeString)?.toISOString()?.split("T").join(" ").split(".")[0]
    return djDateTime;
  }

  /**
   * Helper function for converting view purpose Date String back to datajoint date YYYY-MM-DD
   * @param viewDateString
   * @returns Return date in YYYY-MM-DD
   */
  static parseDateToDJFormat(viewDateString: string): string {
    let djDate = new Date(viewDateString)
    return djDate.toISOString().split("T")[0];
  }

  /**
   * Helper function for taking raw data (obtain from fetch_tuple) to input field format
   * @param rawDateValue 
   * @returns Returns date in YYYY-MM-DD (What input fields uses)
   */
  static covertRawDateToInputFieldFormat(rawDateValue: string): string {
    return new Date(rawDateValue).toISOString().split('T')[0];
  }

  /**
   * Helper function for coverting raw data format from fetching to Input field format
   * @param rawDateTimeValue Date time string obtain from fetch tuple
   * @returns Date time in input field format
   */
  static convertRawDateTimeInputFieldFormat(rawDateTimeValue: string) {
    return new Date(rawDateTimeValue).toISOString().split('T').join(' ').split('.')[0];
  }

  /**
   * Function to get the string version of the data type of the attribute. Typically use for type hints
   * @param tableAttribute 
   * @returns 
   */
  static getTypeString(tableAttribute: TableAttribute) {
    let typeString: string = ""

    // Determine type and any other attributes that need to be set based on that
    if (tableAttribute.attributeType === TableAttributeType.TINY) {
      typeString = "tiny";
    }
    else if (tableAttribute.attributeType === TableAttributeType.TINY_UNSIGNED) {
      typeString = "tiny unsigned";
    }
    else if (tableAttribute.attributeType === TableAttributeType.SMALL) {
      typeString = "small";
    }
    else if (tableAttribute.attributeType === TableAttributeType.SMALL_UNSIGNED) {
      typeString = "small unsigned";
    }
    else if (tableAttribute.attributeType === TableAttributeType.MEDIUM) {
      typeString = "medium";
    }
    else if (tableAttribute.attributeType === TableAttributeType.MEDIUM_UNSIGNED) {
      typeString = "medium unsigned";
    }
    else if (tableAttribute.attributeType === TableAttributeType.BIG) {
      typeString = "big";
    }
    else if (tableAttribute.attributeType === TableAttributeType.BIG_UNSIGNED) {
      typeString = "big unsigned";
    }
    else if (tableAttribute.attributeType === TableAttributeType.INT) {
      typeString = "tiny";
    }
    else if (tableAttribute.attributeType === TableAttributeType.INT_UNSIGNED) {
      typeString = "tiny";
    }
    else if (tableAttribute.attributeType === TableAttributeType.FLOAT) {
      typeString = "float";
    }
    else if (tableAttribute.attributeType === TableAttributeType.FLOAT_UNSIGNED ) {
      typeString = "float unsigned";
    }
    else if (tableAttribute.attributeType === TableAttributeType.DOUBLE) {
      typeString = "double";
    }
    else if (tableAttribute.attributeType === TableAttributeType.DECIMAL) {
      typeString = "decimal(" + tableAttribute.decimalNumDigits + ", " + tableAttribute.decimalNumDecimalDigits + ")";
    }
    else if (tableAttribute.attributeType === TableAttributeType.BOOL) {
      typeString = "bool";
    }
    else if (tableAttribute.attributeType === TableAttributeType.CHAR) {
      typeString = "char(" + tableAttribute.stringTypeAttributeLengthInfo + ")";
    }
    else if (tableAttribute.attributeType === TableAttributeType.VAR_CHAR) {
      typeString = "varchar(" + tableAttribute.stringTypeAttributeLengthInfo + ")";
    }
    else if (tableAttribute.attributeType === TableAttributeType.UUID) {
      typeString = "UUID";
    }
    else if (tableAttribute.attributeType === TableAttributeType.DATE) {
      typeString = "date";
    }
    else if (tableAttribute.attributeType === TableAttributeType.DATETIME) {
      typeString = "datetime";
    }
    else if (tableAttribute.attributeType === TableAttributeType.TIME) {
      typeString = "HH:MM:SS";
    }
    else if (tableAttribute.attributeType === TableAttributeType.TIMESTAMP) {
      typeString = "timestamp";
    }
    else if (tableAttribute.attributeType === TableAttributeType.ENUM) {
      typeString = "enum";
    }

    return typeString;
  }

  /**
   * Helper function to handle the creation of input block based on the corresponding table attribute
   * @param tableAttribute TableAttribute object to be used for extracting type 
   * @param currentValue CurrentValue of the input block for binding. Type any used here as there are many possible types with all the available input blocks
   * @param defaultValue Any default value for input blocks that support it
   * @param handleChange Call back function for when the user make a change to the input block
   */
  static getAttributeInputBlock(tableAttribute: TableAttribute, currentValue: any, defaultValue: string = '', handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, attributeName: string) => void) {
    let type: string = "";
    let min: string = "0";
    let max: string = "0";

    // Determine type and any other attributes that need to be set based on that
    if (tableAttribute.attributeType === TableAttributeType.TINY) {
      type = "number";
      min = "-127";
      max = "128";
    }
    else if (tableAttribute.attributeType === TableAttributeType.TINY_UNSIGNED) {
      type = "number";
      min = "0";
      max = "255";
    }
    else if (tableAttribute.attributeType === TableAttributeType.SMALL) {
      type = "number";
      min = "-32768";
      max = "32767";
    }
    else if (tableAttribute.attributeType === TableAttributeType.SMALL_UNSIGNED) {
      type = "number";
      min = "0";
      max = "65535";
    }
    else if (tableAttribute.attributeType === TableAttributeType.MEDIUM) {
      type = "number";
      min = "-8388608";
      max = "8388607";
    }
    else if (tableAttribute.attributeType === TableAttributeType.MEDIUM_UNSIGNED) {
      type = "number";
      min = "0";
      max = "16777215";
    }
    else if (tableAttribute.attributeType === TableAttributeType.BIG) {
      type = "number";
      min = "-9223372036854775808";
      max = "9223372036854775807";
    }
    else if (tableAttribute.attributeType === TableAttributeType.BIG_UNSIGNED) {
      type = "number";
      min = "0";
      max = "18446744073709551615";
    }
    else if (tableAttribute.attributeType === TableAttributeType.INT) {
      type = "number";
      min = "-2147483648";
      max = "2147483647";
    }
    else if (tableAttribute.attributeType === TableAttributeType.INT_UNSIGNED) {
      type = "number";
      min = "0";
      max = "4294967295";
    }
    else if (tableAttribute.attributeType === TableAttributeType.FLOAT) {
      return(
        <input type="number" value={currentValue} step="any" defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
      );
    }
    else if (tableAttribute.attributeType === TableAttributeType.FLOAT_UNSIGNED ) {
      return(
        <input type="number" value={currentValue} step="any" min="0" defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
      );
    }
    else if (tableAttribute.attributeType === TableAttributeType.DOUBLE) {
      return(
        <input type="number" value={currentValue} step="any" defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
      );
    }
    else if (tableAttribute.attributeType === TableAttributeType.DECIMAL) {
      // Check that decimalNumdigits, and decimalNumDecimalDigits are not undefined
      if (tableAttribute.decimalNumDigits === undefined || tableAttribute.decimalNumDecimalDigits === undefined) {
        throw Error("Decimal attributes of decimalNumDigits or decimalNumDecimalDigits are undefined");
      }

      // Generate max number input for the given params
      let maxValueString: string = "";
      let stepValueString : string = "0.";
      // Deal with the leading numbers before the decimal point
      for (let i = 0; i < tableAttribute.decimalNumDigits - tableAttribute.decimalNumDecimalDigits; i++) {
        maxValueString += "9"
      }
      maxValueString += "."
      
      for (let i = 0; i < tableAttribute.decimalNumDecimalDigits; i++) {
        maxValueString += "9"
      }

      for (let i = 0; i < tableAttribute.decimalNumDecimalDigits - 1; i++) {
        stepValueString += "0"
      }
      stepValueString += "1"

      return(
        <input type="number" value={currentValue} step={stepValueString} min={("-" + maxValueString)} max={maxValueString} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
      );
    }
    else if (tableAttribute.attributeType === TableAttributeType.BOOL) {
      if (defaultValue === "") {
        defaultValue = "false"
      }
      return(
        <select defaultValue={defaultValue}>
          <option selected={!currentValue} value="false"></option>
          <option selected={currentValue} value="true"></option>
        </select>
      );
    }
    else if (tableAttribute.attributeType === TableAttributeType.CHAR) {
      return <input type="text" value={currentValue} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>

    }
    else if (tableAttribute.attributeType === TableAttributeType.VAR_CHAR) {
      return <input type="text" value={currentValue} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
    }
    else if (tableAttribute.attributeType === TableAttributeType.UUID) {
      return <input type="text" value={currentValue} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>

    }
    else if (tableAttribute.attributeType === TableAttributeType.DATE) {
      return <input type="date" value={currentValue} defaultValue={defaultValue === '' ? undefined : defaultValue.replaceAll('"', "")} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
    }
    else if (tableAttribute.attributeType === TableAttributeType.DATETIME || tableAttribute.attributeType === TableAttributeType.TIMESTAMP) {
      var splitResult = [undefined, undefined]
      var defaultValueSplitResult: Array<string> = ['', '']

      if (currentValue !== "undefined undefined" && currentValue !== undefined) { // Yes this is a hack for now, we will consildate this to one standard
        if (Array.isArray(currentValue)) {
          splitResult = currentValue;
        }
        else {
          splitResult = currentValue.split(' ');
        }
      }

      if (defaultValue !== undefined) {
        defaultValueSplitResult = defaultValue.replaceAll('"', '').split(' ')
      }
      
        return(
          <div className="dateTimeFields">
            <input type="date" defaultValue={defaultValueSplitResult[0]} value={splitResult[0]} id={tableAttribute.attributeName + "__date"} onChange={(e) => handleChange(e, tableAttribute.attributeName + "__date")}></input>
            <input type="time" step="1" defaultValue={defaultValueSplitResult[1]} value={splitResult[1]} id={tableAttribute.attributeName + "__time"} onChange={(e) => handleChange(e, tableAttribute.attributeName + "__time")}></input>
          </div>
        );
    }
    else if (tableAttribute.attributeType === TableAttributeType.TIME) {
      return <input type="text" value={currentValue} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
    }
    else if (tableAttribute.attributeType === TableAttributeType.ENUM) {
      if (currentValue) {
        return(
          <select defaultValue={currentValue} onChange={(e) => handleChange(e, tableAttribute.attributeName)}> {
            tableAttribute.enumOptions?.map((enumOptionString: string) => {
              return(<option selected={currentValue === enumOptionString} key={enumOptionString} value={enumOptionString}>{enumOptionString}</option>);
            })}
          </select>
      )
      }
      else {
        return(
          <select defaultValue={defaultValue} onChange={(e) => handleChange(e, tableAttribute.attributeName)}> {
            tableAttribute.enumOptions?.map((enumOptionString: string) => {
              return(<option selected={currentValue === enumOptionString} key={enumOptionString} value={enumOptionString}>{enumOptionString}</option>);
            })}
          </select>
      )}
    }
    else if (tableAttribute.attributeType === TableAttributeType.BLOB) {
      return(
        <input disabled value="=NULL="/>
      )
    }

    // Handle number return types
    if (type === "number") {
      return <input value={currentValue} type={type} min={min} max={max} defaultValue={defaultValue} id={tableAttribute.attributeName} onChange={(e) => handleChange(e, tableAttribute.attributeName)}></input>
    }

    throw Error("Unsupported Type found for attribute: " + tableAttribute.attributeName + ' of type ' + tableAttribute.attributeType);
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Lab6.model;

namespace Lab6.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CourseController : Controller
    {
        [HttpGet]
        public JsonResult Get([FromQuery] int COURSE_ID)
        {
            return new JsonResult(new course().Course_GetAll(COURSE_ID));
        }

        [HttpPost]
        public IActionResult Post([FromQuery] int COURSE_ID, string COURSE_NAME, string COURSE_CODE, string SHORT_NAME)
        {
            new course().insert_course(COURSE_ID, COURSE_NAME, COURSE_CODE, SHORT_NAME);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int COURSE_ID)
        {
            new course().delete_course(COURSE_ID);
            return Ok();
        }

        [HttpPut]
        public IActionResult update_course([FromQuery] int COURSE_ID, string COURSE_NAME, string COURSE_CODE, string SHORT_NAME)
        {
            new course().update_course(COURSE_ID, COURSE_NAME, COURSE_CODE, SHORT_NAME);
            return Ok();
        }
    }
}


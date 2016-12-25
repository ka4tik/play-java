package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

/**
 * Created by kartik on 25/12/16.
 */
public class HomeController extends Controller {

    public Result index(){
        return ok(home.render("Home"));

    }
}

package controllers;

import controllers.pojo.Menu;
import org.apache.commons.lang3.StringUtils;
import play.mvc.Result;
import play.mvc.Results;

import java.io.*;
import java.util.Objects;
import java.util.Scanner;

import static play.mvc.Results.ok;

/**
 * Created by kartik on 27/12/16.
 */
public class TrainingController {

    public Result index() {
        return ok(views.html.training_index.render("Training"));
    }

    public Result copy() {

        return ok(views.html.training_copy.render("Training copy"));

    }

    public Result displayTraining(String topic) {

        System.out.println("Received training display request for " + topic );
        try {
            InputStream in = TrainingController.class.getResourceAsStream("/data/" + topic + "/content.html");
            String content = getString(in);
            Menu menu = parseAndGetMenu(getString(TrainingController.class.getResourceAsStream("/data/" + topic + "/menu")));
            //menu.printMenu();
            return ok(views.html.training_display.render("Training " + topic, menu.getHtml(), content));
        }
        catch (Exception e) {
            e.printStackTrace();
            return Results.internalServerError();
        }

    }

    private Menu parseAndGetMenu(String menuFile) {
        Scanner sc = new Scanner(menuFile);
        Menu rootMenu = new Menu("root","/");
        Menu menu = rootMenu;
        int currentDepth = 0;
        while(sc.hasNextLine()) {
            String line = sc.nextLine();
            String link = sc.nextLine();
            int depth = 0;
            for(int i=0;i<line.length();i++) {
                if(line.charAt(i) != '.')
                    break;
                depth++;
            }
            while(true) {
                String prev = line;
                line = StringUtils.removeStart(line, ".");
                if (Objects.equals(line, prev))
                    break;
            }
            if(depth > currentDepth) {
                menu.subMenu.add(new Menu(line,link, menu ));
                menu = menu.subMenu.get(menu.subMenu.size()-1);
            }
            else if(depth == currentDepth){
                menu = menu.parentMenu;
                menu.subMenu.add(new Menu(line, link,menu));
                menu = menu.subMenu.get(menu.subMenu.size()-1);
            } else if(depth < currentDepth){
                for(int i=0;i< currentDepth-depth+1;i++) {
                    menu = menu.parentMenu;
                }
                menu.subMenu.add(new Menu(line,link, menu));
                menu = menu.subMenu.get(menu.subMenu.size()-1);
            }
            currentDepth = depth;

        }
        return rootMenu;
    }

    private String getString(InputStream in) throws IOException {
        BufferedInputStream bis = new BufferedInputStream(in);
        ByteArrayOutputStream buf = new ByteArrayOutputStream();
        int result = bis.read();
        while (result != -1) {
            buf.write((byte) result);
            result = bis.read();
        }
        return buf.toString();
    }

}

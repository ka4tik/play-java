package controllers.pojo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kartik on 27/12/16.
 */
public class Menu {
    public Menu parentMenu = null;
    public String title;
    public String link;
    public List<Menu> subMenu = new ArrayList<>();
    public Menu(String title, String link) {
        this.title = title;
        this.link =  link;
    }
    public Menu(String title, String link, Menu parentMenu) {
        this.title = title;
        this.parentMenu = parentMenu;
        this.link = link;
    }

    private void printMenu(Menu menu,int depth) {

        if(menu == null) {
            return;
        }
        System.out.println(depth + " " + menu.title);
        for(Menu menu1: menu.subMenu) {
            printMenu(menu1,depth+1);
        }
    }

    public void printMenu() {
        printMenu(this, 0);
    }

    public void getHtml(StringBuilder sb, Menu menu) {
        sb.append("<li>");
        sb.append("<a href='" + menu.link +"'>" +  menu.title + "</a>");
        if(menu.subMenu.size() >0 ) {
            sb.append("<ul class=\"list-style-none sub-menu\">");
            for(int i=0;i<menu.subMenu.size();i++) {
                getHtml(sb, menu.subMenu.get(i));
            }
            sb.append("</ul>");

        }
        sb.append("</li>");
    }
    public String getHtml() {
        StringBuilder sb = new StringBuilder();
        for(Menu menu: subMenu) {
            getHtml(sb, menu);
        }
        return sb.toString();
    }


}

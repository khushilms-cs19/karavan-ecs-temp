package org.apache.camel.karavan.api;

import com.theokanning.openai.completion.CompletionChoice;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.CompletionResult;
import com.theokanning.openai.service.OpenAiService;
import org.apache.camel.karavan.model.JavaBean;
import org.apache.commons.configuration.PropertiesConfiguration;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/ai")
public class OpenAiResource {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getBean")
    public JavaBean getJavaBean(JavaBean bean) throws Exception {
        PropertiesConfiguration configuration = new PropertiesConfiguration();
        configuration.load("application.properties");
        System.out.println(bean.toString());
        OpenAiService openAiService = new OpenAiService(configuration.getString("openai.key"));
        CompletionRequest completionRequest = CompletionRequest.builder().model("text-davinci-003")
                .prompt("Create a java bean with class name " + bean.getClassName() + " and method " + bean.getMethod() +
                        " using Apache camel Exchange object with comments for class and methods.Also add annotations," +
                        " @named(" + bean.getRef() + ") and @BindToRegistry(" + bean.getRef() + ") to it with respective imports needed." +
                        " The method should return void and have Exchange as parameter." +
                        " Follow the order import -> class -> method." +
                        " Code should be described like this :  " + bean.getCodeDescription())
                .maxTokens(300).temperature(0.7).build();
        CompletionResult result = openAiService.createCompletion(completionRequest);
        List<CompletionChoice> choices = result.getChoices();
        String resultString = choices.get(0).getText();
        int importIndex = resultString.indexOf("import ");

        if (importIndex != -1)
            resultString = resultString.substring(importIndex);
        bean.setCode(resultString);
        return bean;
    }
}

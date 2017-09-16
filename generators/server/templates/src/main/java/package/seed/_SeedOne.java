package <%=packageName%>.seed;

import br.com.munif.framework.vicente.core.RightsHelper;
import br.com.munif.framework.vicente.core.VicThreadScope;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author munif
 */
@Component
public class SeedOne {
    
    private static final Logger log = LoggerFactory.getLogger(SeedOne.class);
    
    @Transactional
    public void seed(){
        log.info("Starting seed");
        VicThreadScope.gi.set("SEED");
        VicThreadScope.ui.set("SEED");
        VicThreadScope.ip.set("127.0.0.1");
        VicThreadScope.defaultRights.set(RightsHelper.OTHER_READ);
        log.info("Inserting data");
        
    }
    
    
    
}

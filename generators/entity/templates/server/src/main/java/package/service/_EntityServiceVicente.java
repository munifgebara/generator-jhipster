<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
package <%=packageName%>.service;

import br.com.munif.framework.vicente.application.BaseService;
import br.com.munif.framework.vicente.application.VicRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import <%=packageName%>.domain.<%= entityClass %>;

<%  const instanceType = (dto === 'mapstruct') ? entityClass + 'DTO' : entityClass;
    const instanceName = (dto === 'mapstruct') ? entityInstance + 'DTO' : entityInstance; %>
<%_ if (dto === 'mapstruct') { _%>
import <%=packageName%>.service.dto.<%= entityClass %>DTO;
<%_ } else { _%>
import <%=packageName%>.domain.<%= entityClass %>;
<%_ } _%>
<%_ if (pagination !== 'no') { _%>
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
<%_ } _%>
<%_ if (pagination === 'no' || fieldsContainNoOwnerOneToOne === true) { _%>
import java.util.List;
<%_ } _%>

@Service
public class <%=entityClass%>Service extends BaseService<<%=entityClass%>>{
    
    public <%=entityClass%>Service(VicRepository<<%=entityClass%>> repository) {
        super(repository);
    }
    
    
    
    
}
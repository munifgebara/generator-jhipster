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
package <%=packageName%>.web.rest;

import br.com.munif.framework.vicente.api.BaseAPI;
import br.com.munif.framework.vicente.application.BaseService;
import <%=packageName%>.domain.<%= entityClass %>;
import com.codahale.metrics.annotation.Timed;
<%_ if (dto !== 'mapstruct' || service === 'no') { _%>
import <%=packageName%>.domain.<%= entityClass %>;
<%_ } _%>
<%_ if (service !== 'no') { _%>
import <%=packageName%>.service.<%= entityClass %>Service;<% } else { %>
import <%=packageName%>.repository.<%= entityClass %>Repository;<% if (searchEngine === 'elasticsearch') { %>
import <%=packageName%>.repository.search.<%= entityClass %>SearchRepository;<% }} %>
import <%=packageName%>.web.rest.util.HeaderUtil;<% if (pagination !== 'no') { %>
import <%=packageName%>.web.rest.util.PaginationUtil;<% } %>
<%_ if (dto === 'mapstruct') { _%>
import <%=packageName%>.service.dto.<%= entityClass %>DTO;
<%_ if (service === 'no') { _%>
import <%=packageName%>.service.mapper.<%= entityClass %>Mapper;
<%_ } } _%>
<%_ if (jpaMetamodelFiltering) {  _%>
import <%=packageName%>.service.dto.<%= entityClass %>Criteria;
import <%=packageName%>.service.<%= entityClass %>QueryService;
<%_ } _%>
<%_ if (pagination !== 'no') { _%>
import io.swagger.annotations.ApiParam;
<%_ } _%>
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
<%_ if (pagination !== 'no') { _%>
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
<%_ } _%>
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<% if (validation) { %>
import javax.validation.Valid;<% } %>
import java.net.URI;
import java.net.URISyntaxException;
<%_ const viaService = service !== 'no';
    if (pagination === 'no' && dto === 'mapstruct' && !viaService && fieldsContainNoOwnerOneToOne === true) { _%>
import java.util.LinkedList;<% } %>
import java.util.List;
import java.util.Optional;<% if (databaseType === 'cassandra') { %>
import java.util.UUID;<% } %><% if (!viaService && (searchEngine === 'elasticsearch' || fieldsContainNoOwnerOneToOne === true)) { %>
import java.util.stream.Collectors;<% } %><% if (searchEngine === 'elasticsearch' || fieldsContainNoOwnerOneToOne === true) { %>
import java.util.stream.StreamSupport;<% } %><% if (searchEngine === 'elasticsearch') { %>

import static org.elasticsearch.index.query.QueryBuilders.*;<% } %>

/**
 * REST controller for managing <%= entityClass %>.
 */
@RestController
@RequestMapping("/api/<%= entityApiUrl %>")
public class <%= entityClass %>Resource extends BaseAPI<<%= entityClass %>>{

    private final Logger log = LoggerFactory.getLogger(<%= entityClass %>Resource.class);

    private static final String ENTITY_NAME = "<%= entityInstance %>";

    public <%= entityClass %>Resource(<%= entityClass %>Service service) {
        super(service);
    }


}
